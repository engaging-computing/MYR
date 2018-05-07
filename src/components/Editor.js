import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { RaisedButton, Drawer, Toolbar, ToolbarGroup, FontIcon } from 'material-ui';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import 'brace/mode/javascript';
import 'brace/theme/github';
import firebase, { auth } from '../firebase.js';
import Reference from './Reference';
import 'firebase/firestore';
import $ from "jquery";

/**x
 * The Editor component is where you are able to input code and 
 * have it render in the View. 
 * Application state is from the Redux Store and the models are 
 * from Firebase Firestore.
 */

var db = firebase.firestore();
var scenes = db.collection('scenes');
var storageRef = firebase.storage().ref();

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      availProj: [],
      sampleProj: [],
      autoReload: false,
      user: props.user,
      projOpen: false,
      projectsToDelete: [],

    };
  }

  componentDidUpdate() {
    if (auth.currentUser) {
      let vals = [];
      this.props.actions.login(auth.currentUser);
      scenes.where('uid', '==', auth.currentUser.uid).get().then(snap => {
        snap.forEach(doc => {
          vals.push({
            id: doc.id,
            data: doc.data(),
            url: storageRef.child(`/images/equirectangular/${doc.id}`).getDownloadURL()
          });
        });
        if (this.state.availProj.length !== vals.length) {
          this.setState({ availProj: vals });
        }
      });
    }
  }
  componentDidMount() {
    let vals = [];
    scenes.where('uid', '==', "1").get().then(snap => {
      snap.forEach(doc => {
        storageRef.child(`/images/equirectangular/${doc.id}`).getDownloadURL().then((img) => {
          vals.push({
            id: doc.id,
            data: doc.data(),
            url: img
          });
        });
      })
    });
    this.setState({ sampleProj: vals });
  }


  // Pass nothing into render to clear contents
  clear = () => {
    const content = this.refs.aceEditor.editor.session.getValue();
    this.props.actions.refresh(content);
  }

  // Open and close the project drawer
  projToggle = () => {
    this.setState({ projOpen: !this.state.projOpen });
    this.state.projectsToDelete.forEach((proj) => {
      scenes.doc(proj).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    });
    this.setState({ projectsToDelete: [] });
  }

  // When selected, take the information and pass it into the applications local state
  handleLoad = (event) => {
    event.preventDefault();
    if (event.target.id) {
      this.props.actions.loadScene(event.target.id);
      scenes.doc(event.target.id).get().then(doc => {
        let scene = doc.data();
        if (scene.code) {
          this.props.actions.render(scene.code);
          this.props.actions.nameScene(scene.name);
          this.props.actions.loadScene(doc.id);
        } else {
          this.props.actions.render("// The code was corrupted");
        }
      });
    }
  }

  handleSave = () => {
    this.handleRender();
    let projectID = this.props.scene.id;
    let ts = Date.now();
    if (this.props.user) {
      $("body").prepend("<span class='spinner'><div class='cube1'></div><div class='cube2'></div></span>");
      if (projectID) {
        projectID = this.props.user.uid + '_' + ts;
        this.props.actions.loadScene(projectID);
      }
      let code = this.props.text;
      let uid = this.props.user.uid;
      // use uid_epoch as identifier for now
      let modes = [
        'equirectangular',
        // 'perspective'
      ];
      // upload images
      for (var mode of modes) {
        let img = document.querySelector('a-scene').components.screenshot.getCanvas(mode).toDataURL('image/png');
        let path = "images/" + mode + "/" + projectID;
        let imgRef = storageRef.child(path);
        let name = this.props.scene.name;
        imgRef.putString(img, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string!');
          db.collection("scenes").doc(projectID).set({
            name: name,
            code: code,
            uid: uid,
            ts: ts,
          }).then(() => {
            console.log("Document successfully written!");
            $(".spinner").remove();
          }).catch((error) => {
            console.error("Error writing document: ", error);
            $(".spinner").remove();
          });
        }).catch((error) => {
          console.error("Error uploading a data_url string ", error);
          $(".spinner").remove();
        });
      }
    }
  }

  handleNewProj = () => {
    this.props.actions.render("");
    if (this.props.user) {
      this.props.actions.nameScene("untitled");
    }
  }

  // When user clicks render get text from AceEditor and pass to render action
  handleRender = () => {
    const content = this.refs.aceEditor.editor.session.getValue();
    this.props.actions.render(content);
  }

  // Add the project clicked to the list to be delete
  addToDeleteList = (id) => {
    let deleteThese = this.state.projectsToDelete;
    $('#' + id).toggleClass("to-delete");
    if (deleteThese.includes(id)) {
      deleteThese = deleteThese.filter((x) => x !== id);
      this.setState({ projectsToDelete: deleteThese });
    } else {
      deleteThese.push(id);
      this.setState({ projectsToDelete: deleteThese });
    }
  }

  // Produces the Render and Clear buttons
  buttons = () => {
    const style = {
      marginLeft: 4,
    };
    return (
      <div>
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
          onClick={this.clear}
          style={style}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
        />
      </div>
    );
  }

  // Produces the toolbar that contains persistence controls
  toolbar = () => {
    const style = {
      margin: 2,
    };
    return (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton
            onClick={this.handleSave}
            style={style}
            label="Save"
            icon={<FontIcon className="material-icons">save</FontIcon>}
          />
          <RaisedButton
            onClick={this.projToggle}
            style={style}
            label="Open"
            icon={<FontIcon className="material-icons">file_download</FontIcon>}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <Reference />
        </ToolbarGroup>
      </Toolbar>
    );
  }

  // Produces the list of the available projects
  renderProjs = () => {
    const newBtn = <RaisedButton label="Start a New Project"
      secondary={true}
      onClick={this.handleNewProj}
      fullWidth={true}
      className="mb-3"
      icon={<AddCircle />} />;
    return (
      <div id="project-list" >
        {newBtn}
        {this.state.availProj.length !== 0 && this.props.user !== null ?
          <div className="row" id="user-proj" style={{ width: "100%" }}>
            <h3 className="col-12 p-2 mb-3 border-bottom"> Your Projects</h3>
            <hr />
            {this.state.availProj.map((proj) => {
              return (
                <div key={proj.id} id={proj.id} className="grid-project col-sm-6 p-3 mb-3" onClick={this.handleLoad} title={proj.data.name}>
                  <h4>{proj.data.name}</h4>
                  <img id={proj.id} alt={proj.id} className="img-thumbnail mb-1" src={proj.url.j} />
                  <RaisedButton
                    onClick={() => this.addToDeleteList(proj.id)}
                    label="delete Project"
                    fullWidth={true}
                    secondary={true}
                    icon={<FontIcon className="material-icons">delete</FontIcon>}
                  />
                </div>
              );
            })}
          </div> : null}
        <div className="row" id="sample-proj" style={{ width: "100%" }}>
          <h3 className="col-12 p-2 mb-3 border-bottom">Sample Projects</h3>
          {this.state.sampleProj.map((proj) => {
            return (
              <div key={proj.id} id={proj.id} className="grid-project col-sm-6 p-3 mb-3" onClick={this.handleLoad} title={proj.data.name}>
                <h4>{proj.data.name}</h4>
                <img id={proj.id} alt={proj.id} className="img-thumbnail mb-1" src={proj.url} />
                <RaisedButton
                  onClick={() => this.addToDeleteList(proj.id)}
                  label="delete Project"
                  fullWidth={true}
                  secondary={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  render() {
    return (
      <div id="editor" >
        <Drawer docked={false} width={500}
          onRequestChange={(projOpen) => this.setState({ projOpen })}
          open={this.state.projOpen} >
          {this.renderProjs()}
        </Drawer>
        <this.toolbar />
        <AceEditor ref="aceEditor" width="100%" mode="javascript" theme="github" value={this.props.text} name="ace-editor" />
        {this.buttons()}
      </div>
    );
  }
}

export default Editor;