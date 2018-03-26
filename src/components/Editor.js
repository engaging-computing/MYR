import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { RaisedButton, Popover, Menu, MenuItem, Drawer, GridList, GridTile, Subheader } from 'material-ui';
import 'brace/mode/javascript';
import 'brace/theme/github';
import firebase, { auth } from '../firebase.js'
import 'firebase/firestore'

var db = firebase.firestore();
var scenes = db.collection('scenes');
const storage = firebase.storage()
var storageRef = storage.ref();

window.scenes = scenes

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      availProj: [],
      autoReload: false,
      user: props.user,
      drawOpen: false
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

  handleToggle = () => {
    this.setState({ drawOpen: !this.state.drawOpen });
  }

  componentWillUpdate() {
    if (auth.currentUser && this.state.availProj.length === 0) {
      let vals = []
      scenes.where('uid', '==', auth.currentUser.uid).get().then(snap => {
        window.snap = snap
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
          label="Toggle Drawer"
          onClick={this.handleToggle}
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
            <MenuItem primaryText="Generate Random" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
        {this.props.children}
      </div>
    )
  }

  handleSave = () => {
    this.handleRender()
    if (this.props.user) {
      let code = this.props.text
      let els = this.props.objects
      let uid = this.props.user.uid
      // use uid_epoch as identifier for now
      let ts = Date.now()
      let projectID = uid + '_' + ts;
      let modes = [
        'equirectangular',
        // 'perspective'
      ];
      // upload images
      for (var mode of modes) {
        let img = document.querySelector('a-scene').components.screenshot.getCanvas(mode).toDataURL('image/png');
        let path = "images/" + mode + "/" + projectID;
        let imgRef = storageRef.child(path);
        imgRef.putString(img, 'data_url').then(function (snapshot) {
          console.log('Uploaded a data_url string!');
        }).catch(function (error) {
          console.error("Error uploading a data_url string ", error);
        });
      }
      // save code and myr scene els
      db.collection("scenes").doc(projectID).set({
        name: this.props.sceneName,
        code: code,
        els: els,
        uid: uid,
        ts: ts,
      }).then(function () {
        console.log("Document successfully written!");
      }).catch(function (error) {
        console.error("Error writing document: ", error);
      });
    }
  }

  handleRender = () => {
    const content = this.refs.aceEditor.editor.session.getValue()
    this.props.actions.render(content)
  }

  renderProjs = () => {
    if (this.state.availProj === 0) {
      return null
    }
    return (
      <GridList cellHeight={180} >
        <Subheader>Projects</Subheader>
        {this.state.availProj.map((proj) => {
          let httpsReference = storageRef.child(`/images/equirectangular/${proj.id}`).getDownloadURL()
          console.log(httpsReference.i)
            return (
              <GridTile
                id={proj.id}
                title={proj.data.name}>
                <img src={proj.url.i} />
              </GridTile>
            )
          })
        }
      </GridList>
    )
  }

  render() {
    const text = this.props.text
    return (
      <div id="editor" className="col-lg-4">
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawOpen}
          onRequestChange={(drawOpen) => this.setState({ drawOpen })}>
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