import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { RaisedButton, Popover, Menu, MenuItem, Drawer, DropDownMenu, Toolbar, ToolbarGroup, FontIcon, ToolbarSeparator, ToolbarTitle, IconMenu, IconButton } from 'material-ui';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import 'brace/mode/javascript';
import 'brace/theme/github';
import firebase, { auth } from '../firebase.js'
import Reference from './Reference'
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
      projOpen: false,
      projectsToDelete: []
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
    this.state.projectsToDelete.forEach((proj) => {
      scenes.doc(proj).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    })
    this.setState({ projectsToDelete: [] })
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
    this.props.actions.render("// Input your code here\nanimate(box({material: {color: 'red'}}));")
    if (this.props.user) {
      this.props.actions.nameScene("untitled")
    }
  }

  handleRender = () => {
    const content = this.refs.aceEditor.editor.session.getValue()
    this.props.actions.render(content)
  }

  addToDeleteList = (id) => {
    let deleteThese = this.state.projectsToDelete
    deleteThese.push(id)
    this.setState({ projectsToDelete: deleteThese })
  }

  handleChange = (event, index, value) => this.setState({ value });

  buttons = () => {
    const style = {
      marginLeft: 2,
    };
    return (
      <div className="" role="group" aria-label="...">
        <RaisedButton
          label="Render"
          primary={true}
          onClick={this.handleRender}
          style={style}
          icon={<FontIcon className="material-icons">autorenew</FontIcon>}
        />
        <RaisedButton
          label="Clear"
          secondary={true}
          onClick={this.remove}
          style={style}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
        />
      </div>
    )
  }

  toolbar = () => {
    return (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton
            onClick={this.handleSave}
            label="Save Project"
            icon={<FontIcon className="material-icons">save</FontIcon>}
          />
          <RaisedButton
            onClick={this.projToggle}
            label="Open Project"
            icon={<FontIcon className="material-icons">file_download</FontIcon>}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <Reference />
        </ToolbarGroup>
      </Toolbar>
    )
  }

  renderProjs = () => {
    if (this.state.availProj.length === 0) {
      return null
    }
    return (
      <div id="project-list" >
        <h3 className="mb-3">Projects</h3>
        <div className="row" style={{ width: "100%" }}>
          <RaisedButton
            label="Start a New Project"
            secondary={true}
            onClick={this.handleNewProj}
            fullWidth={true}
            className="mb-3"
            icon={<AddCircle />}
          />
          {this.state.availProj.map((proj) => {
            return (
              <div
                key={proj.id}
                id={proj.id}
                className="grid-project col-sm-6 mb-5"
                onClick={this.handleLoad}
                title={proj.data.name}>
                <h4>{proj.data.name}</h4>
                <img id={proj.id} className="img-thumbnail" src={proj.url.i} />
                <RaisedButton
                  onClick={() => this.addToDeleteList(proj.id)}
                  label="delete Project"
                  fullWidth={true}
                  secondary={true}
                  icon={<FontIcon className="material-icons">delete</FontIcon>}
                />
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
      <div id="editor">
        <Drawer
          docked={false}
          width={500}
          open={this.state.projOpen}
          onRequestChange={(projOpen) => this.setState({ projOpen })}>
          {this.renderProjs()}
        </Drawer>
        <this.toolbar />
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