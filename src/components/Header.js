import React, { Component } from 'react';
import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Popover,
  Tooltip,
  Drawer,
  IconButton,
  FormControl,
  TextField,
  Snackbar,
  Modal
} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import { auth, provider, db, scenes, storageRef } from '../firebase.js';
import Sidebar from './Sidebar';
import $ from "jquery";
import ProgressiveImage from 'react-progressive-image';

import { Link } from 'react-router-dom';

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
      projectsToDelete: [],
      loadOpen: false,
      snackOpen: true,
      viewOptOpen: false,
      lastMsgTime: 0,
      anchorEl: null,
      modalOpen: false,
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
    this.setState({ snackOpen: true, lastMsgTime: this.props.message.time });

    // 4. Render project if we have projectId. This should only happen if coming from viewer
    if (this.props.projectId) {
      $("body").prepend("<span class='spinner'><div class='cube1'></div><div class='cube2'></div></span>");
      // When the data's metedata changes, ie update
      scenes.doc(this.props.projectId).onSnapshot({
        includeMetadataChanges: true,
      }, (doc) => {
        let data = doc.data();
        if (data && data.code) {
          // Clear contents for fresh render and then render
          this.props.actions.refresh("", this.props.user ? this.props.user.uid : 'anon');
          this.props.actions.render(data.code, this.props.user ? this.props.user.uid : 'anon');
          this.props.sceneActions.nameScene(data.name);
          if (data.uid === "1") {
            this.props.sceneActions.loadScene('0');
          } else {
            this.props.sceneActions.loadScene(doc.id);
          }
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
      this.handleRender();
    } else if (e.ctrlKey && e.shiftKey && e.which === 83) {
      this.handleSave(true);
    } else if (e.ctrlKey && e.which === 83) {
      this.handleSave(false);
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
    if (this.state.lastMsgTime !== this.props.message.time) {
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
    });
  }

  /**
  * @summary - This function produces the DOM elements to display logging functionality
  */
  loginBtn = () => {
    let btn;
    if (this.props.user !== null) {
      btn = <MenuItem primaryText="Log Out" onClick={this.logout} >Log Out</MenuItem>;
    } else {
      btn = <MenuItem primaryText="Log In" onClick={this.login} >Log In</MenuItem>;
    }
    let photoURL = this.props.user ? this.props.user.photoURL : process.env.PUBLIC_URL + '/img/acct_circle.svg';
    return (
      <div id="user" >
        <Avatar
          id="login"
          src={photoURL}
          onClick={this.handleLogClick}
          label="Logout" />
        <Popover
          open={this.state.logMenuOpen}
          anchorEl={document.getElementById('user')}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          onClose={this.handleLogClick} >
          {btn}
        </Popover>
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
    this.props.sceneActions.loadScene('0');
    this.setState({ sceneName: null });
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
          value={text}
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
  * @summary - handleNewProj will render an empty string and set the scene's name to untitled
  */
  handleNewProj = () => {
    this.props.actions.render("", this.props.user);
    if (this.props.user) {
      this.props.sceneActions.nameScene("untitled");
      this.props.sceneActions.loadScene('0');
    }
  }

  /**
  * @summary - This function will determine which projectId to use when saving. 
  * 1. Loaded a sample project => generate new id
  * 2. Save with same name as last => overwrite current
  * 3. Save with new name from last => generate new id
  * @param {bool} needsNewId - bool for callsite id generation
  * 
  * @returns - projectId
  */
  getProjectId = (needsNewId) => {
    let ts = Date.now();
    let projectId = this.props.projectId ? this.props.projectId : "";
    if (projectId === '0' || this.props.projectId === "undefined" || needsNewId) {
      // Generate a new projectId
      projectId = this.props.user.uid + '_' + ts;
    }
    return projectId;
  }

  /**
  * @summary - When the user clicks save it will upload the information to Firebase
  */
  handleSave = (needsNewId) => {
    // render the current state so the user can see what they are saving
    this.handleRender();
    let ts = Date.now();
    if (this.props.user && this.props.user.uid) {
      $("body").prepend("<span class='spinner'><div class='cube1'></div><div class='cube2'></div></span>");
      let projectID = this.getProjectId(needsNewId);
      let scene = document.querySelector('a-scene');
      // Access the scene and sceen shot, with perspective view in a lossy jpeg format
      let img = scene.components.screenshot.getCanvas('perspective').toDataURL('image/jpeg', 0.1);
      let path = "images/perspective/" + projectID;
      let imgRef = storageRef.child(path);
      imgRef.putString(img, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        // Put the new document into the scenes collection
        db.collection("scenes").doc(projectID).set({
          name: this.props.scene.name,
          desc: this.state.sceneDesc,
          code: this.props.text,
          uid: this.props.user.uid,
          ts: ts,
        }).then(() => {
          console.log("Document successfully written!");
          // If we have a new projectId reload page with it
          if (projectID !== this.props.projectId) {
            window.location.href = window.origin + '/edit/' + projectID;
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
    }
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
          className="header-btn">
          <Icon className="material-icons">save</Icon> Save
          </Button>
      </Drawer>
    );
  }

  /**
  * @summary - toggles the load project drawer
  */
  handleLoadToggle = () => {
    if (this.state.projectsToDelete.length > 0) {
      this.state.projectsToDelete.forEach((proj) => {

        // Delete Image
        let path = "images/perspective/" + proj;
        let imgRef = storageRef.child(path);
        imgRef.delete().then(() => {
          console.log("Image successfully deleted!");
        }).catch((error) => {
          console.error("Error removing img: ", error);
        });

        // Delete Document
        scenes.doc(proj).delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      });
      this.getUserProjs();
    }
    this.setState({ projectsToDelete: [], loadOpen: !this.state.loadOpen });
  };

  loadDrawer = () => {
    const renderProj = (proj, canDelete) => {
      return (
        <div key={proj.id} id={proj.id} className="grid-project p-3 mb-3" title={proj.data.name}>
          <a href={`/edit/${proj.id}`} >
            <h4>{proj.data.name}</h4>
            <ProgressiveImage src={proj.url} placeholder={process.env.PUBLIC_URL + '/img/Loading_icon.gif'}>
              {(src) => <img id={proj.id} alt={proj.id} className="img-thumbnail mb-1" src={src} />}
            </ProgressiveImage>
          </a>
          {canDelete ?
            <Button
              onClick={() => this.addToDeleteList(proj.id)}
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
        variant="persistent"
        className="side-drawer"
        open={this.state.loadOpen}
        onClose={this.handleLoadToggle} >
        <IconButton variant="raised"
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
              {this.state.availProj !== null ? this.state.availProj.map((proj) => {
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
  * @summary - This toggles the selected project to be deleted when the drawer is closed. 
  * Items are added and removed from the projectsToDelete collection. When the user closes the
  * drawer it will remove all projects still in the collection
  */
  addToDeleteList = (id) => {
    let deleteThese = this.state.projectsToDelete;
    $('#' + id).toggleClass("to-delete");
    if (deleteThese.includes(id)) {
      deleteThese = deleteThese.filter((it) => it !== id);
      this.setState({ projectsToDelete: deleteThese });
    } else {
      deleteThese.push(id);
      this.setState({ projectsToDelete: deleteThese });
    }
  }

  /**
  * @summary - Create a Drawer with options to the control the scene
  * 
  */
  openSceneOpt = () => {
    this.setState({ sceneOptOpen: true });
  }

  closeSceneOpt = () => {
    this.setState({ sceneOptOpen: false });
  }

  sceneOptionsDrawer = () => {
    return (
      <Drawer
        docked={false}
        className="side-drawer"
        open={this.state.sceneOptOpen}
        onRequestChange={(open) => this.setState({ open })} >
        {/* onClose={this.closeSceneOpt} > */}
        <IconButton variant="raised"
          color="default"
          style={exitBtnStyle}
          onClick={this.closeSceneOpt} >
          <Icon className="material-icons">close</Icon>
        </IconButton>
        <div id="scene-options" >
          <h2> Scene Config</h2>
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
    return (
      <div>
        <Button
          variant="raised"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          style={{
            margin: 4,
            padding: 2,
            background: 'linear-gradient(45deg, #DDD 30%, #BBB 90%)',
          }}
          onClick={this.handleViewOptClick}>
          Change View
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleViewOptClose} >
          <MenuItem >
            <Link to={`/view/${this.props.projectId}`}>
              <Icon style={{ verticalAlign: 'bottom' }} className="material-icons">visibility</Icon> View
            </Link>
          </MenuItem>
          <MenuItem >
            <Link to={`/edit/${this.props.projectId}`}>
              <Icon style={{ verticalAlign: 'bottom' }} className="material-icons">code</Icon> Edit
            </Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }

  navNewScene = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  confirmationModal = () => {
    const styles = {
      paper: {
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        height: 'inherit',
        width: 'inherit',
        transform: 'translate(-50%, -50%)'
      },
      confirm: {
        float: 'left',
        marginLeft: '10em',
        background: 'linear-gradient(45deg, #38e438 30%, #58e458 90%)',
      },
      cancel: {
        float: 'right',
        marginRight: '10em',
        background: 'linear-gradient(45deg, #FE3B3B 30%, #FF3B3B 90%)',
      }
    };

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.modalOpen}
        onClose={this.closeModal}
        hideBackdrop={true}
        id="confirmation-modal"
        style={styles.paper} >
        <div>
          <h1>Are you sure you want to procede? </h1>
          <p>You will lose any unsaved work</p>
          <Button
            href='/'
            onClick={() => window.href = '/'}
            style={styles.confirm}
            variant="raised"
            size="small"
            className="d-none d-md-block">
            <Icon className="material-icons">check_circle_outline</Icon> Yes
          </Button>
          <Button
            onClick={this.closeModal}
            style={styles.cancel}
            variant="raised"
            size="small"
            className="d-none d-md-block">
            <Icon className="material-icons">highlight_off</Icon> No
          </Button>
        </div>
      </Modal>
    );
  }

  /**
  * @summary - render() creates the header and links the buttons
  */
  render() {
    const style = {
      play: {
        color: "#333",
        margin: 4,
        padding: 0,
        background: 'linear-gradient(45deg, #38e438 30%, #58e458 90%)',
      },
      clear: {
        margin: 4,
        padding: 0,
        background: 'linear-gradient(45deg, #FE3B3B 30%, #FF3B3B 90%)',
      },
      persist: {
        margin: 4,
        padding: 0,
        background: 'linear-gradient(45deg, #DDD 30%, #BBB 90%)',
      }
    };
    return (
      <header className="App-header row align-items-center ">
        <div className="col-2 d-flex justify-content-start">
          <Sidebar scene={this.props.scene} nameScene={this.props.sceneActions.nameScene} >
            <Button label="Start a New Project"
              variant="raised"
              onClick={this.handleNewProj}
              color="primary"
              className="sidebar-btn">
              <Icon className="material-icons">add</Icon>
              Start New
          </Button>
            <Button label="Recover"
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
              <Icon className="material-icons">file_download</Icon>
              Open Project
          </Button>
            <Button
              variant="raised"
              onClick={this.openSceneOpt}
              color="primary"
              className="sidebar-btn">
              <Icon className="material-icons">settings</Icon>
              Scene Config
          </Button>
          </Sidebar>
          <Link to='/'>
            <h1 className="mr-2">MYR</h1>
          </Link>
          <Tooltip title="New Scene" placement="bottom-start">
            <Button
              variant="flat"
              size="small"
              onClick={this.navNewScene}
              style={{ color: "white" }}
              className="header-btn" >
              <Icon className="material-icons">add_circle_outline</Icon> New
            </Button>
          </Tooltip>
        </div>
        <div className="col-7 d-flex justify-content-start">
          <Tooltip title="Render" placement="bottom-start">
            <Button
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
              variant="raised"
              size="small"
              onClick={this.clear}
              className="header-btn"
              style={style.clear}>
              <Icon className="material-icons">stop</Icon>
            </Button>
          </Tooltip>
          <Tooltip title="Save" placement="bottom-start">
            <Button
              variant="raised"
              size="small"
              onClick={this.handleSaveToggle}
              className="header-btn d-none d-md-block"
              style={style.persist}>
              <Icon className="material-icons">save</Icon>
            </Button>
          </Tooltip>
          <Tooltip title="Open" placement="bottom-start">
            <Button
              variant="raised"
              size="small"
              onClick={this.handleLoadToggle}
              className="header-btn"
              style={style.persist}>
              <Icon className="material-icons">file_download</Icon>
            </Button>
          </Tooltip>
        </div>
        <div className="col-3 d-flex justify-content-end">
          <this.renderViewSelect />
          <this.loginBtn />
        </div>
        <this.sceneOptionsDrawer />
        <this.saveDrawer />
        <this.loadDrawer />
        <this.renderSnackBar />
        <this.confirmationModal />
      </header>
    );
  }
}

export default Header;