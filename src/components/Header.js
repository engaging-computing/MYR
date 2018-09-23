import React, { Component, Fragment } from 'react';
import { auth, provider, db, scenes, storageRef } from '../firebase.js';

import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Tooltip,
  Drawer,
  IconButton,
  FormControl,
  TextField,
  Snackbar,
  Popover,
  Avatar
} from '@material-ui/core';
import Reference from './Reference.js';
import SceneConfig from './SceneConfig.js';
import Sidebar from './Sidebar.js';
import MyrTour from './MyrTour';
import $ from "jquery";
import ProgressiveImage from 'react-progressive-image';

const exitBtnStyle = {
  position: "fixed",
  top: 0,
  right: 0,
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logMenuOpen: false,
      sceneName: null,
      sceneDesc: "",
      availProj: [],
      sampleProj: [],
      autoReload: false,
      projOpen: true,
      loadOpen: false,
      snackOpen: false,
      viewOptOpen: false,
      lastMsgTime: 0,
      anchorEl: null,
      navAwayModal: false,
      needsNewId: false // this explicitly tells us to make a new id
    };
  }

  /**
  * @summary - When the component is done rendering, we want to:
  * 1. sync authentication with Firebase and Redux.
  * 2. Load the user projects.
  * 3. Load sample projects.
  * 4. Render project if we have projectId
  */
  componentDidMount() {
    // 1. Sync authentication
    auth.onAuthStateChanged((account) => {
      if (account) {
        this.props.logging.login(account);
        // 2. If we have a user, load their projects
        this.getUserProjs();
      } else {
        this.props.logging.logout();
      }
    });

    // 3. Load the sample projects
    if (this.state.sampleProj.length === 0) {
      let samplVals = [];
      scenes.where('uid', '==', "1").get().then(snap => {
        snap.forEach(doc => {
          storageRef.child(`/images/perspective/${doc.id}`).getDownloadURL().then((img) => {
            samplVals.push({
              id: doc.id,
              data: doc.data(),
              url: img
            });
          });
        });
        this.setState({ sampleProj: samplVals });
      });
    }

    // 4. Render project if we have projectId. This should only happen if coming from viewer
    if (this.props.projectId) {
      $("body").prepend("<span class='spinner'><div class='cube1'></div><div class='cube2'></div></span>");
      // When the data's metedata changes, ie update
      scenes.doc(this.props.projectId).onSnapshot({
        includeMetadataChanges: true,
      }, (doc) => {
        if (this.props.user && this.props.user.uid) {
          this.props.actions.fetchScene(this.props.projectId, this.props.user.uid);
        } else {
          this.props.actions.fetchScene(this.props.projectId);
        }
        $(".spinner").remove();
      });
    }

    // Bind to keyboard to listen for shortcuts
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  /**
  * @summary - Catches certain keyboard shortcuts
  *
  * @param {event} e - event from the keystroke.
  */
  handleKeyDown(e) {
    if (e.ctrlKey && e.which === 13) {
      this.clear();
      this.handleRender();
    } else if (e.ctrlKey && e.shiftKey && e.which === 83) {
      this.setState({ needsNewId: true });
      this.handleSave();
    } else if (e.ctrlKey && e.which === 83) {
      this.handleSave();
    }
  }

  /**
  * @summary - Removes listener for real time sync process
  */
  componentWillUnmount() {
    var unsubscribe = scenes.onSnapshot(function () { });
    unsubscribe();
  }

  /**
  * @summary - When we update, check to see if there is a new message by comparing the local state to
  * props.message.time
  */
  componentDidUpdate() {
    if (this.state.lastMsgTime !== this.props.message.time && this.props.message.text !== "") {
      this.setState({ snackOpen: true, lastMsgTime: this.props.message.time });
    }
  }

  /**
  * @summary - sets component state:availProj to the the user's projects if logged in
  */
  getUserProjs = () => {
    if (this.props.user && this.props.user.uid) {
      let userVals = [];
      scenes.where('uid', '==', this.props.user.uid).get().then(snap => {
        snap.forEach(doc => {
          storageRef.child(`/images/perspective/${doc.id}`).getDownloadURL().then((img) => {
            userVals.push({
              id: doc.id,
              data: doc.data(),
              url: img
            });
          });
        });
        this.setState({ availProj: userVals });
      });
    }
  }

  /**
  * @summary - The logout function runs when the user click to logout of the application.
  */
  logout = () => {
    auth.signOut().then(() => {
      // sync with application state
      this.props.logging.logout();
      this.setState({ logMenuOpen: false });
    });
  }

  /**
  * @summary - The login function runs when the user click to login of the application.
  */
  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const account = result.account;
      // sync with application state
      this.props.logging.login(account);
      this.setState({ logMenuOpen: false });
    });
  }

  /**
  * @summary - This function produces the DOM elements to display logging functionality
  */
  loginBtn = () => {
    return (
      <div id="user" >
        {this.props.user && this.props.user.displayName ?
          <Fragment>
            <Avatar
              id="login"
              src={this.props.user.photoURL}
              open={this.state.logMenuOpen}
              onClick={() => this.setState({ logMenuOpen: !this.state.logMenuOpen })}
              label="logout"
              style={{ marginTop: 5, marginLeft: 15 }} />

            {/* <span
               className="user-name d-none d-lg-block"  >
               Logged in as <br />
               {this.props.user.displayName}
               </span> */}
            <Popover
              open={this.state.logMenuOpen}
              anchorEl={document.getElementById('user')}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              onClose={this.handleLogClick} >
              <MenuItem primarytext="Log Out" onClick={this.logout} >Log Out</MenuItem>
            </Popover>
          </Fragment>
          :
          <Button
            type="button"
            variant="outlined"
            size="small"
            color="primary"
            onClick={this.login}
            style={{
              color: "white",
              margin: 4,
              padding: 2,
              border: "1px solid #fff"
            }}>
            Log In
          </Button>
        }
      </div>
    );
  }

  /**
  * @summary - This function handles when the user wants to toggle the logging menu
  */
  handleLogClick = (event) => {
    event.preventDefault();
    this.setState({
      logMenuOpen: !this.state.logMenuOpen,
    });
  };

  /**
  * @summary - This sets the components current state to the input from the scene name form
  */
  handleNameChange = (event) => {
    this.setState({ sceneName: event.target.value });
  }

  /**
  * @summary - submitName is called when we are ready to synce the local component's state with
  * the reducer.
  */
  submitName = (event) => {
    event.preventDefault();
    this.props.sceneActions.nameScene(this.state.sceneName);
    this.setState({ sceneName: null, needsNewId: true });
  }

  /**
  * @summary - This sets the components current state to the input from the scene description form
  */
  handleDescChange = (event) => {
    this.setState({ sceneDesc: event.target.value });
  }

  /**
  * @summary - This function produces the form for inputting the scene's name and description
  */
  sceneName = () => {
    let text = "";
    if (this.state.sceneName === null) {
      text = this.props.scene.name;
    } else {
      text = this.state.sceneName;
    }
    return (
      <FormControl className="mt-2" aria-describedby="name-helper-text">
        <TextField id="name-helper"
          value={text ? text : ""}
          label="Scene Name"
          onSubmit={this.submitName}
          onBlur={this.submitName}
          onChange={this.handleNameChange} />
        <TextField
          value={this.state.sceneDesc}
          onChange={this.handleDescChange}
          label="Description"
          margin="normal"
        />
      </FormControl>
    );
  }

  /**
  * @summary - handeRender gets the information from Ace Editor and calls the action: render()
  */
  handleRender = () => {
    try {
      let editor = window.ace.edit("ace-editor");
      this.props.actions.render(editor.getSession().getValue(), this.props.user ? this.props.user.uid : 'anon');
    } catch (error) {
      this.props.actions.render(this.props.text, this.props.user ? this.props.user.uid : 'anon');
    }
  }

  /**
  * @summary - This function will determine which projectId to use when saving.
  *
  * @returns - projectId
  */
  getProjectId = () => {
    let ts = Date.now();
    let projectId = this.props.projectId || null;
    if (!projectId || !this.props.scene.id || this.state.needsNewId) {
      // Generate a new projectId
      projectId = this.props.user.uid + '_' + ts;
    }
    return projectId;
  }

  /**
  * @summary - When the user clicks save it will upload the information to Firebase
  */
  handleSave = () => {
    // render the current state so the user can see what they are saving
    this.handleRender();
    if (this.props.user && this.props.user.uid) {
      $("body").prepend("<span class='spinner'><div class='cube1'></div><div class='cube2'></div></span>");
      let ts = Date.now();
      let projectId = this.getProjectId();
      let scene = document.querySelector('a-scene');
      // Access the scene and screen shot, with perspective view in a lossy jpeg format
      let img = scene.components.screenshot.getCanvas('perspective').toDataURL('image/jpeg', 0.1);
      let path = "images/perspective/" + projectId;
      let imgRef = storageRef.child(path);
      imgRef.putString(img, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        // Put the new document into the scenes collection
        db.collection("scenes").doc(projectId).set({
          name: this.props.scene.name,
          desc: this.state.sceneDesc,
          code: this.props.text,
          uid: this.props.user.uid,
          ts: ts,
        }).then(() => {
          console.log("Document successfully written!");
          // If we have a new projectId reload page with it
          if (projectId !== this.props.projectId) {
            window.location.href = window.origin + '/' + projectId;
          } else {
            this.getUserProjs();
          }
        }).catch((error) => {
          console.error("Error writing document: ", error);
          $(".spinner").remove();
        });
      }).catch((error) => {
        console.error("Error uploading a data_url string ", error);
        $(".spinner").remove();
      });
    } else {
      // TODO: Don't use alert
      alert('Error: You must be logged in to save your work.');
    }
    this.handleSaveToggle();
  }

  /**
  * @summary - resets the current scene
  */
  clear = () => {
    try {
      let editor = window.ace.edit("ace-editor");
      this.props.actions.refresh(editor.getSession().getValue(), this.props.user ? this.props.user.uid : 'anon');
    } catch (error) {
      this.props.actions.refresh(this.props.text, this.props.user ? this.props.user.uid : 'anon');
    }
  }

  /**
  * @summary - toggles the save drawer
  */
  handleSaveToggle = () => this.setState({ saveOpen: !this.state.saveOpen });

  /**
  * @summary - creates the save drawer
  */
  saveDrawer = () => {
    return (
      <Drawer
        variant="persistent"
        className="side-drawer"
        open={this.state.saveOpen}
        onClose={this.handleSaveToggle} >
        <IconButton variant="raised"
          color="default"
          style={exitBtnStyle}
          onClick={this.handleSaveToggle}>
          <Icon className="material-icons">close</Icon>
        </IconButton>
        <this.sceneName />
        <Button
          variant="raised"
          size="small"
          color="primary"
          onClick={() => this.handleSave(false)}
          className="">
          <Icon className="material-icons">save</Icon> Save
          </Button>
      </Drawer>
    );
  }

  /**
  * @summary - This function passes through the confirm dialog. If true then delete the scene
  * otherwise skip.
  *
  * @param {string} id - the project ID to be deleted
  * @param {string} name - the name of the project
  *
  */
  deleteScene = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      // Delete Image
      let path = "images/perspective/" + id;
      let imgRef = storageRef.child(path);
      imgRef.delete().then(() => {
        console.log("Image successfully deleted!");
      }).catch((error) => {
        console.error("Error removing img: ", error);
      });

      // Delete Document
      scenes.doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
    this.getUserProjs();
  }

  /**
  * @summary - toggles the load project drawer
  */
  handleLoadToggle = () => {
    this.setState({ loadOpen: !this.state.loadOpen });
  };

  loadDrawer = () => {
    const renderProj = (proj, canDelete) => {
      return (
        <div key={proj.id} id={proj.id} className="grid-project p-3 mb-3" title={proj.data.name}>
          <a href={`/${proj.id}`} >
            <h4>{proj.data.name}</h4>
            <ProgressiveImage src={proj.url} placeholder={process.env.PUBLIC_URL + '/img/Loading_icon.gif'}>
              {(src) => <img id={proj.id} alt={proj.id} className="img-thumbnail mb-1" src={src} />}
            </ProgressiveImage>
          </a>
          {canDelete ?
            <Button
              onClick={() => this.deleteScene(proj.id, proj.data.name)}
              label="delete Project"
              fullWidth={true}
              color="secondary">
              <Icon className="material-icons">delete</Icon>
            </Button>
            : null
          }
        </div>
      );
    };

    return (
      <Drawer
        className="side-drawer"
        open={this.state.loadOpen}
        onClick={this.handleLoadToggle}
        onClose={this.handleLoadToggle} >
        <IconButton
          color="default"
          style={exitBtnStyle}
          onClick={this.handleLoadToggle}>
          <Icon className="material-icons">close</Icon>
        </IconButton>
        <div id="project-list" >
          {this.props.user !== null ?
            <div className="row" id="user-proj" style={{ width: "100%" }}>
              <h3 className="col-12 p-2 mb-3 border-bottom"> Your Projects</h3>
              <hr />
              {this.state.availProj ? this.state.availProj.map((proj) => {
                return (renderProj(proj, true));
              })
                : null}
            </div>
            : null}
          <div className="row" id="sample-proj" style={{ width: "100%" }}>
            <h3 className="col-12 p-2 mb-3 border-bottom">Sample Projects</h3>
            {this.state.sampleProj !== null ? this.state.sampleProj.map((proj) => {
              return (renderProj(proj, false));
            })
              : null}
          </div>
        </div>
      </Drawer>
    );
  }

  /**
  * @summary - closes the snackabar that displays the message from render
  */

  closeSnackBar = () => {
    this.setState({ snackOpen: false });
  }

  renderSnackBar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.snackOpen}
        autoHideDuration={6000}
        onClose={this.closeSnackBar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message.text}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.closeSnackBar}>
            Dismiss
        </Button>
        ]}
      />
    );
  }

  handleViewOptClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleViewOptClose = () => {
    this.setState({ anchorEl: null });
  };

  renderViewSelect = () => {
    const { anchorEl } = this.state;

    const style = {
      margin: 2,
      padding: 0,
      color: '#fff',
    };

    return (
      <Fragment>
        <Tooltip title="Change View" placement="bottom-start">
          <IconButton
            id="view-btn"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            className="header-btn "
            onClick={this.handleViewOptClick}
            style={style}>
            <Icon className="material-icons">visibility</Icon>
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleViewOptClose} >
          <SceneConfig scene={this.props.scene} sceneActions={this.props.sceneActions} />
        </Menu>
      </Fragment>
    );
  }

  /**
  * @summary - render() creates the header and links the buttons
  */
  render() {
    const style = {
      play: {
        margin: 5,
        padding: 0,
        background: 'linear-gradient(45deg, #38e438 30%, #58e458 90%)',
      },
      clear: {
        margin: 5,
        marginRight: 20,
        padding: 0,
        background: 'linear-gradient(45deg, #FE3B3B 30%, #FF3B3B 90%)',
      },
      default: {
        margin: 2,
        padding: 0,
        color: '#fff',
      }
    };
    return (
      <header className="App-header align-items-center ">
        {/* <DisplayMsg open={this.state.navAwayModal} {...this.confirmNavAway} /> */}
        <div className="col-9 d-flex justify-content-start">
          <Sidebar scene={this.props.scene} nameScene={this.props.sceneActions.nameScene} >
            <Button
              variant="raised"
              onClick={() => {
                if (window.confirm('Are you sure you start a new scene?\nYou will lose any unsaved work!')) {
                  window.location.href = window.origin;
                }
              }}
              color="primary"
              className="sidebar-btn">
              <Icon className="material-icons">add</Icon>
              Start New
            </Button>
            <Button
              variant="raised"
              onClick={this.props.actions.recover}
              color="primary"
              className="sidebar-btn">
              <Icon className="material-icons">replay</Icon>
              Recover
            </Button>
            <Button
              variant="raised"
              onClick={this.handleSaveToggle}
              color="primary"
              className="sidebar-btn">
              <Icon className="material-icons">save</Icon>
              Save Project
            </Button>
            <Button
              variant="raised"
              onClick={this.handleLoadToggle}
              color="primary"
              className="sidebar-btn">
              <Icon className="material-icons">perm_media</Icon>
              Open Project
            </Button>
          </Sidebar>
          <h1 className="mr-2 d-none d-sm-block" >MYR</h1>
          <Tooltip title="Render" placement="bottom-start">
            <Button
              id="play-btn"
              variant="raised"
              size="small"
              onClick={this.handleRender}
              className="header-btn"
              style={style.play}>
              <Icon className="material-icons">play_arrow</Icon>
            </Button>
          </Tooltip>
          <Tooltip title="Stop" placement="bottom-start">
            <Button
              id="stop-btn"
              variant="raised"
              size="small"
              onClick={this.clear}
              className="header-btn"
              style={style.clear}>
              <Icon className="material-icons">stop</Icon>
            </Button>
          </Tooltip>
          <Tooltip title="New Scene" placement="bottom-start">
            <IconButton
              id="new-btn"
              onClick={() => {
                if (window.confirm('Are you sure you start a new scene?\nYou will lose any unsaved work!')) {
                  window.location.href = window.origin;
                }
              }}
              style={style.default}
              className="header-btn d-none d-md-block" >
              <Icon className="material-icons">add_circle_outline</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Save" placement="bottom-start">
            <IconButton
              id="save-btn"
              onClick={this.handleSaveToggle}
              className="header-btn d-none d-md-block"
              style={style.default} >
              <Icon className="material-icons">save</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Open" placement="bottom-start">
            <IconButton
              id="open-btn"
              onClick={this.handleLoadToggle}
              className="header-btn d-none d-sm-block"
              style={style.default}>
              <Icon className="material-icons">perm_media</Icon>
            </IconButton>
          </Tooltip>
          <MyrTour />
        </div>
        <div className="col-3 d-flex justify-content-end">
          <Reference />
          <this.renderViewSelect />
          <this.loginBtn />
        </div>
        <this.saveDrawer />
        <this.loadDrawer />
        <this.renderSnackBar />
      </header>
    );
  }
}

export default Header;
