import React, { Component, Fragment } from "react";
import { auth, provider, scenes, classes, storageRef } from "../firebase.js";
import Reference from "./Reference.js";
import Classroom from "./Classroom.js";
import SceneConfigMenu from "./SceneConfigMenu.js";
import Sidebar from "./Sidebar.js";
import MyrTour from "./MyrTour";
import ProjectView from "./ProjectView.js";
import CourseSelect from "./CourseSelect.js";

import * as layoutTypes from "../constants/LayoutTypes.js";

import {
    Button,
    Icon,
    MenuItem,
    Tooltip,
    Drawer,
    IconButton,
    FormControl,
    TextField,
    Snackbar,
    Popover,
    Avatar
} from "@material-ui/core";

const exitBtnStyle = {
    position: "fixed",
    top: 0,
    right: 0,
};

let shouldRender = false;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logMenuOpen: false,
            sceneName: null,
            sceneDesc: "",
            availProj: [],
            sampleProj: [],
            classroomOpen: false,
            loadOpen: false,
            snackOpen: false,
            lastMsgTime: 0,
            anchorEl: null,
            navAwayModal: false,
            needsNewId: false, // this explicitly tells us to make a new id
            spinnerOpen: false,
            referenceOpen: false
        };
    }

    /**
  * @summary - When the component is done rendering, we want to:
  */
    componentDidMount() {
        this.props.projectActions.asyncExampleProj();
        this.props.courseActions.fetchCourses();
        if (this.props.courseName) {
            this.props.courseActions.fetchCourse(this.props.courseName);
        }
        else if (this.props.classroom) {
            let userClasses = [];
            classes.where("classroomID", "==", this.props.classroom).get().then(snap => {
                snap.forEach(doc => {
                    let dat = doc.data();
                    userClasses.push({
                        classroomID: dat.classroomID,
                        uid: dat.uid
                    });
                });
            }).then(() => {
                if (this.props.user && this.props.user.uid && userClasses.length === 1 && userClasses[0].uid === this.props.user.uid) {
                    this.props.classroomActions.asyncClass(this.props.classroom);
                }
                else {
                    window.alert("Error: You are not logged in as the owner of this class");
                }
            });

        }

        if (this.props.scene && this.props.scene.name) {
            this.setState({ sceneName: this.props.scene.name });
        }

        if (this.props.scene && this.props.scene.desc) {
            this.setState({ sceneDesc: this.props.scene.desc });
        }

        // Sync authentication
        auth.onAuthStateChanged((account) => {
            if (account) {
                this.props.logging.login(account);
                // 2. If we have a user, load their projects
                this.props.projectActions.asyncUserProj(this.props.user.uid);
                this.props.classroomActions.asyncClasses(this.props.user.uid);
            } else {
                this.props.logging.logout();
            }
        });

        // Render project if we have projectId. This should only happen if coming from viewer
        const { match } = this.props;
        const projectId = (match && match.params && match.params.id) || "";
        if (this.props.match && projectId) {
            this.setState({ spinnerOpen: true });
            // When the data's metedata changes, ie update
            scenes.doc(projectId).onSnapshot({
                includeMetadataChanges: true,
            }, (doc) => {
                if (this.props.user && this.props.user.uid) {
                    this.props.actions.fetchScene(projectId, this.props.user.uid);
                } else {
                    this.props.actions.fetchScene(projectId);
                }
                this.setState({ spinnerOpen: false });
            });
        }

        // Bind to keyboard to listen for shortcuts
        document.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Warn the issue before refreshing the page
    // TODO: Only do so if unsaved changes
    // window.addEventListener('beforeunload', (event) => {
    //     event.returnValue = 'You have may have unsaved changes!';
    // });
    }

    /**
  * @summary - Catches certain keyboard shortcuts
  *
  * @param {event} e - event from the keystroke.
  */
    handleKeyDown(e) {
    //metaKey is cmd and windows key in some browsers
        if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.key === "Return")) {
            //ctrl/cmd + enter renders the scene
            e.preventDefault();
            this.clear();
            this.handleRender();
        } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "s" || e.key === "S")) {
            //ctrl/cmd + shift + s saves the scene with a new ID
            e.preventDefault();
            this.setState({ needsNewId: true });
            this.handleSave();
        } else if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
            //ctrl/cmd + s saves the scene
            e.preventDefault();
            this.handleSave();
            this.handleSaveClose();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.scene && nextProps.scene.name) {
            this.setState({ sceneName: nextProps.scene.name });
        }

        if (nextProps.scene && nextProps.scene.desc) {
            this.setState({ sceneDesc: nextProps.scene.desc });
        }
    }

    /**
  * @summary - Removes listener for real time sync process
  */
    componentWillUnmount() {
        let unsubscribe = scenes.onSnapshot(function () { });
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
        if(shouldRender) {
            shouldRender = false;
            this.handleRender();
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
                          style={{ marginTop: 5 }} />
                      <Popover
                          open={this.state.logMenuOpen}
                          anchorEl={document.getElementById("user")}
                          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
                  onBlur={this.handleNameChange}
                  onChange={this.handleNameChange} />
              <TextField
                  value={this.state.sceneDesc}
                  onChange={this.handleDescChange}
                  onBlur={this.handleDescChange}
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
          this.props.actions.refresh(editor.getSession().getValue());
          this.props.actions.render(editor.getSession().getValue(), this.props.user ? this.props.user.uid : "anon");
      } catch (error) {
          this.props.actions.render(this.props.text, this.props.user ? this.props.user.uid : "anon");
      }
  }

  /**
  * @summary - This function will determine which projectId to use when saving.
  *
  * @returns - projectId
  */
  getProjectId = () => {
      const { match } = this.props;
      let projectId = (match && match.params && match.params.id) || null;
      if (!projectId || !this.props.scene.id || this.state.needsNewId) {
      // Generate a new projectId
          projectId = scenes.doc().id;
      }
      return projectId;
  }

  spinner = () => {
      if (this.state.spinnerOpen) {
          return (
              <span className='spinner'>
                  <div className='cube1'></div>
                  <div className='cube2'></div>
              </span>
          );
      } else {
          return null;
      }
  }

  /**
  * @summary - When the user clicks save it will upload the information to Firebase
  */
  handleSave = () => {
      let editor, text;
      if(!this.props.viewOnly) {
      //If in editor mode, gets text directly from editor
          editor = window.ace.edit("ace-editor");
          text = editor.getSession().getValue();
          this.props.actions.refresh(text, this.props.user ? this.props.user.uid : "anon");
      } else {
      //Otherwise, gets text from state (should be up to date since it is refreshed on editor unmount) 
          text = this.props.text;
      }

      if (this.props.user && this.props.user.uid && text) {
          this.setState({ spinnerOpen: true });
          let ts = Date.now();
          let projectId = this.getProjectId();
          let scene = document.querySelector("a-scene");
          // Access the scene and screen shot, with perspective view in a lossy jpeg format
          let img = scene.components.screenshot.getCanvas("perspective").toDataURL("image/jpeg", 0.1);
          let path = "images/perspective/" + projectId;
          let imgRef = storageRef.child(path);

          imgRef.putString(img, "data_url").then((snapshot) => {
              // Put the new document into the scenes collection
              scenes.doc(projectId).set({
                  name: this.state.sceneName,
                  desc: this.state.sceneDesc,
                  code: text,
                  uid: this.props.user.uid,
                  settings: this.props.scene.settings,
                  ts: ts,
              }).then(() => {
                  // If we have a new projectId reload page with it
                  if (this.props.courseName) {
                      this.setState({ spinnerOpen: false });
                      //window.open(window.origin + '/' + projectId);
                  } else if (projectId !== this.props.projectId) {
                      window.location.href = window.origin + "/" + projectId;
                  } else {
                      this.props.projectActions.asyncUserProj(this.props.user.uid);
                  }
              }).catch((error) => {
                  console.error("Error writing document: ", error);
                  this.setState({ spinnerOpen: false });
              });
          }).catch((error) => {
              console.error("Error uploading a data_url string ", error);
              this.setState({ spinnerOpen: false });
          });
      } else {
      // TODO: Don't use alert
          alert("We were unable to save your project. Are you currently logged in?");
      }
      this.handleSaveToggle();
  }

  /**
  * @summary - resets the current scene
  */
  clear = () => {
      try {
          let editor = window.ace.edit("ace-editor");
          this.props.actions.refresh(editor.getSession().getValue(), this.props.user ? this.props.user.uid : "anon");
      } catch (error) {
          this.props.actions.refresh(this.props.text, this.props.user ? this.props.user.uid : "anon");
      }
  }

  /**
  * @summary - toggles the save drawer
  */
  handleSaveToggle = () => this.setState({ saveOpen: !this.state.saveOpen });

  /**
  * @summary - forces save drawer closed
  */
  handleSaveClose = () => this.setState({ saveOpen: false });

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
  * @summary - toggles the load project drawer
  */
  handleLoadToggle = () => {
      this.setState({ loadOpen: !this.state.loadOpen });
  };

  handleClassroomToggle = () => {
      this.setState({ classroomOpen: !this.state.classroomOpen });
  };

  handleClassroomClose = () => {
      this.setState({ classroomOpen: false });
  };

  handleReferenceToggle = () => {
      this.setState({ referenceOpen: !this.state.referenceOpen });
  };

  loadDrawer = () => {
      return (
          <Drawer
              id="projectDrawer"
              className="side-drawer"
              // variant="persistent"
              open={this.state.loadOpen}
              onClose={this.handleLoadToggle} >
              <IconButton
                  color="default"
                  style={exitBtnStyle}
                  onClick={this.handleLoadToggle}>
                  <Icon className="material-icons">close</Icon>
              </IconButton>
              <ProjectView
                  deleteFunc={this.props.projectActions.deleteProj}
                  userProjs={this.props.projects.userProjs}
                  examplProjs={this.props.projects.examplProjs} />
          </Drawer>
      );
  }

  loadClassroom = () => {
      return (
          <Classroom
              classrooms={this.props.classrooms}
              classroomActions={this.props.classroomActions}
              user={this.props.user}
              open={this.state.classroomOpen}
              handleClassroomToggle={this.handleClassroomToggle}
              handleClassroomClose={this.handleClassroomClose} />
      );
  }

  /**
  * @summary - closes the snackbar that displays the message from render
  */

  closeSnackBar = () => {
      this.setState({ snackOpen: false });
  }

  renderSnackBar = () => {
      return (
          <Snackbar
              anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
              }}
              open={this.state.snackOpen}
              autoHideDuration={6000}
              onClose={this.closeSnackBar}
              ContentProps={{
                  "aria-describedby": "message-id",
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

  /**
  * @summary - render() creates the header and links the buttons
  */
  render() {
      const style = {
          play: {
              margin: 5,
              padding: 0,
              background: "linear-gradient(45deg, #38e438 30%, #58e458 90%)",
          },
          clear: {
              margin: 5,
              marginRight: 10,
              padding: 0,
              background: "linear-gradient(45deg, #FE3B3B 30%, #FF3B3B 90%)",
          },
          default: {
              margin: 2,
              padding: 0,
              color: "#fff",
          },
          disabled: {
              margin: 2,
              padding: 0,
              color: "#777",
          }
      };
      return (
          <header className="App-header align-items-center ">
              <div className="col-9 d-flex justify-content-start" style={{ paddingLeft: 0 }}>
                  <Sidebar scene={this.props.scene} nameScene={this.props.sceneActions.nameScene} >
                      <Button
                          variant="raised"
                          onClick={() => {
                              if (window.confirm("Are you sure you start a new scene?\nYou will lose any unsaved work!")) {
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
                          className="sidebar-btn"
                          disabled={this.props.layoutType === layoutTypes.REFERENCE}>
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
                      <Button
                          variant="raised"
                          onClick={this.handleClassroomToggle}
                          color="primary"
                          className="sidebar-btn">
                          <Icon className="material-icons">assignment</Icon>
              Classrooms
                      </Button>
                  </Sidebar>
                  <h1 className="mr-2 d-none d-sm-block" >MYR</h1>
                  <Tooltip title="Render" placement="bottom-start">
                      <Button
                          id="play-btn"
                          variant="raised"
                          size="small"
                          onClick={() => {
                              this.clear();
                              shouldRender = true;
                          }}
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
                              if (window.confirm("Are you sure you start a new scene?\nYou will lose any unsaved work!")) {
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
                          className="header-btn d-none d-sm-block"
                          style={this.props.layoutType === layoutTypes.REFERENCE ? style.disabled : style.default}
                          disabled={this.props.layoutType === layoutTypes.REFERENCE} >
                          <Icon className="material-icons">save</Icon>
                      </IconButton>
                  </Tooltip>
                  <Tooltip title="Open" placement="bottom-start">
                      <IconButton
                          id="open-btn"
                          referenceOpen={this.state.referenceOpen}
                          handleReferenceToggle={this.handleReferenceToggle}
                          onClick={this.handleLoadToggle}
                          className="header-btn"
                          style={style.default}>
                          <Icon className="material-icons">perm_media</Icon>
                      </IconButton>
                  </Tooltip>
                  <MyrTour 
                      viewOnly={this.props.scene.settings.viewOnly}
                      changeView={this.props.sceneActions.changeView}
                      layoutType={this.props.layoutType}
                      referenceOpen={this.state.referenceOpen}
                      handleReferenceToggle={this.handleReferenceToggle}/>
              </div>
              <div className="col-3 d-flex justify-content-end">
                  {/* <Classroom classrooms={this.props.classrooms} classroomActions={this.props.classroomActions} user={this.props.user} /> */}
                  <Reference 
                      layoutType={this.props.layoutType}
                      referenceOpen={this.state.referenceOpen}
                      handleReferenceToggle={this.handleReferenceToggle} />
                  <SceneConfigMenu
                      scene={this.props.scene}
                      sceneActions={this.props.sceneActions}
                      handleRender={this.handleRender}
                      handleSave={this.handleSave}
                      handleSaveClose={this.handleSaveClose}
                      layoutType={this.props.layoutType} />
                  <CourseSelect courses={this.props.courses.courses} />
                  <this.loginBtn />
              </div>
              <this.saveDrawer />
              <this.loadDrawer />
              <this.renderSnackBar />
              <this.spinner />
              <this.loadClassroom />
          </header>
      );
  }
}

export default Header;
