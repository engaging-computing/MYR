import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { RaisedButton, Popover, Menu, MenuItem, Drawer, GridList, GridTile, Subheader } from 'material-ui';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import FontIcon from 'material-ui/FontIcon';
import 'brace/mode/javascript';
import 'brace/theme/github';
import firebase, { auth } from '../firebase.js'
import 'firebase/firestore'

var db = firebase.firestore();
var scenes = db.collection('scenes');
const storage = firebase.storage()
var storageRef = storage.ref();

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      availProj: [],
      autoReload: false,
      user: props.user,
      projOpen: false
    };
  }

  componentDidMount() {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid
      if (uid) {
        this.setState({ user: uid })
      }
    }
  }

  componentWillUpdate() {
    if (auth.currentUser) {
      let vals = []
      scenes.where('uid', '==', auth.currentUser.uid).get().then(snap => {
        snap.forEach(doc => {
          vals.push({
            id: doc.id,
            data: doc.data(),
            url: storageRef.child(`/images/equirectangular/${doc.id}`).getDownloadURL()
          })
        });
        if (this.state.availProj.length !== vals.length) {
          this.setState({ availProj: vals })
        }
      })
    }
  }

  remove = () => {
    this.props.actions.refresh("");
  }

  projToggle = () => {
    this.setState({ projOpen: !this.state.projOpen });
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleLoad = (event) => {
    event.preventDefault();
    if (event.target.id) {
      this.props.actions.loadScene(event.target.id)
      scenes.doc(event.target.id).get().then(doc => {
        let scene = doc.data()
        if (scene.code) {
          this.props.actions.render(scene.code)
          this.props.actions.nameScene(scene.name)
          this.props.actions.loadScene(doc.id)
        } else {
          this.props.actions.render("// The code was corrupted")
        }
        console.log(scene)
      })
    }
  }

  handleSave = () => {
    this.handleRender()
    let projectID = this.props.scene.id
    let ts = Date.now()
    if (this.props.user) {
      if (projectID) {
        projectID = this.props.user.uid + '_' + ts
        this.props.actions.loadScene(projectID)
      }
      let code = this.props.text
      let els = this.props.objects
      let uid = this.props.user.uid
      // use uid_epoch as identifier for now
      let modes = [
        'equirectangular',
        // 'perspective'
      ];
      // upload images
      for (var mode of modes) {
        let img = document.querySelector('a-scene').components.screenshot.getCanvas(mode).toDataURL('image/png');
        let path = "images/" + mode + "/" + projectID;
        let imgRef = storageRef.child(path)
        let name = this.props.scene.name
        imgRef.putString(img, 'data_url').then(function (snapshot) {
          console.log('Uploaded a data_url string!');
          db.collection("scenes").doc(projectID).set({
            name: name,
            code: code,
            uid: uid,
            ts: ts,
          }).then(function () {
            console.log("Document successfully written!")
          }).catch(function (error) {
            console.error("Error writing document: ", error)
          });
        }).catch(function (error) {
          console.error("Error uploading a data_url string ", error)
        });
      }
    }
  }

  handleNewProj = () => {
    if (this.props.user) {
      let uid = this.props.user.uid
      // use uid_epoch as identifier for now
      let ts = Date.now()
      let projectID = uid + '_' + ts;
      this.props.actions.newScene(projectID)
    }
  }

  handleRender = () => {
    const content = this.refs.aceEditor.editor.session.getValue()
    this.props.actions.render(content)
  }
  buttons = () => {
    const style = {
      margin: 2,
    };
    return (
      <div className="btn-group pull-left" role="group" aria-label="...">
        <RaisedButton
          label="Render"
          primary={true}
          onClick={this.handleRender}
          style={style}
        />
        <RaisedButton
          label="Clear"
          secondary={true}
          onClick={this.remove}
          style={style}
        />
        <RaisedButton
          style={style}
          onClick={this.handleClick}
          label="Options"
        />
        <RaisedButton
          label="Load Project"
          onClick={this.projToggle}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Save Scene" onClick={this.handleSave} />
            {/* <MenuItem primaryText="Generate Random" /> */}
            {/* <MenuItem primaryText="Sign out" /> */}
          </Menu>
        </Popover>
        {this.props.children}
      </div>
    )
  }


  renderProjs = () => {
    if (this.state.availProj.length === 0) {
      return null
    }
    return (
      <div id="project-list" >
        <h3>Projects</h3>
        <div className="row" style={{ width: "100%" }}>
          <RaisedButton
            label="Start a New Project"
            secondary={true}
            onClick={this.handleNewProj}
            fullWidth={true}
            icon={<AddCircle />}
          />
          {this.state.availProj.map((proj) => {
            return (
              <div
                key={proj.id}
                id={proj.id}
                className="grid-project col-sm-6"
                onClick={this.handleLoad}
                title={proj.data.name}>
                <img id={proj.id} className="img-thumbnail" src={proj.url.i} />
                <p>{proj.data.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    const text = this.props.text
    return (
      <div id="editor" className="col-lg-4">
        <Drawer
          docked={false}
          width={500}
          open={this.state.projOpen}
          onRequestChange={(projOpen) => this.setState({ projOpen })}>
          {this.renderProjs()}
        </Drawer>
        <AceEditor
          ref="aceEditor"
          width="100%"
          mode="javascript"
          theme="github"
          value={text}
          name="ace-editor"
        />
        {this.buttons()}
      </div>
    );
  }
}

export default Editor