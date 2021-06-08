import React, { Component, Fragment } from "react";
import Reference from "../../reference/Reference.js";
import Collection from "../../collection/Collection.js";
import SceneConfigMenu from "./SceneConfigMenu.js";
import Sidebar from "./Sidebar.js";
import MyrTour from "./MyrTour.js";
import ProjectView from "./ProjectView.js";
import CourseSelect from "../../courses/CourseSelect.js";
import WelcomeScreen from "../WelcomeScreen.js";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import sockets from "socket.io-client";

import * as layoutTypes from "../../../constants/LayoutTypes.js";

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
    Avatar,
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core";
import { save } from "../../../actions/projectActions.js";

const exitBtnStyle = {
    position: "absolute",
    top: 0,
    right: 0,
};

/**
 * React component class for the header
 */
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logMenuOpen: false,
            availProj: [],
            sampleProj: [],
            collectionOpen: false,
            projectsOpen: false,
            projectTab: "a",
            snackOpen: false,
            lastMsgTime: 0,
            anchorEl: null,
            navAwayModal: false,
            needsNewId: false, // this explicitly tells us to make a new id
            spinnerOpen: false,
            referenceOpen: false,
            coursesOpen: false,
            tourOpen: false,
            welcomeOpen: false,
            updateCollection: false,
            fetchCollection: false,
            socket: sockets(),
            savedSettings: [],
            googleUser: undefined
        };

        this.state.socket.on("update", () => {
            let editor = window.ace.edit("ace-editor");            
            if(editor.getSession().getValue() === this.props.scene.code || window.confirm("A new version of the scene is available, would you like to load it?")){
                this.props.actions.fetchScene(this.props.projectId);
            }
        });
    }

    /**
     * When the component is done rendering, we want to:
     */
    componentDidMount() {
        this.props.projectActions.asyncExampleProj();
        this.props.courseActions.fetchCourses();

        if (this.props.courseName) {
            this.props.courseActions.fetchCourse(this.props.courseName);
        }
        else if (this.props.refExName) {
            this.props.referenceExampleActions.fetchReferenceExample(this.props.refExName);
        }
        else if (this.props.collection) {
            this.setState({ fetchCollection: true });
        }

        // Render project if we have projectId. This should only happen if coming from viewer
        const { match } = this.props;
        const projectId = (match && match.params && match.params.id) || "";
        if (this.props.match && projectId) {
            this.setState({ spinnerOpen: true });
            this.props.actions.fetchScene(projectId);
            this.setState({ spinnerOpen: false });

            this.state.socket.emit("scene", projectId);
        }

        // Bind to keyboard to listen for shortcuts
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    /**
     * Catches certain keyboard shortcuts
     *
     * @param {event} e - event from the keystroke.
     */
    handleKeyDown(e) {
        //metaKey is cmd and windows key in some browsers
        if (this.props.layoutType !== layoutTypes.REFERENCE) {
            if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.key === "Return")) {
                //ctrl/cmd + enter renders the scene
                e.preventDefault();
                this.clear();
                this.closeSnackBar();
                this.handleRender();
            } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "s" || e.key === "S")) {
                //ctrl/cmd + shift + s saves the scene with a new ID
                e.preventDefault();
                this.setState({ needsNewId: true });
                this.handleSaveOpen();
            } else if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
                //ctrl/cmd + s saves the scene
                e.preventDefault();
                this.handleSave();
                this.handleSaveClose();
            }
        }
    }

    /**
     * Removes listener for real time sync process
     */
    componentWillUnmount() {
    }

    /**
     * When we update, check to see if there is a new message by comparing the local state to
     * props.message.time
     */
    componentDidUpdate() {
        if (this.state.lastMsgTime !== this.props.message.time && this.props.message.text !== "") {
            this.setState({ snackOpen: true, lastMsgTime: this.props.message.time });
        }
        if(this.state.updateCollection && this.props.user){
            this.props.collectionActions.asyncCollection(this.props.collection, this.props.user.uid);
            this.setState({ updateCollection: false });
        }
        if(this.state.fetchCollection && this.props.user){
            this.props.collectionActions.asyncCollection(this.props.collection, this.props.user.uid);
            this.setState({ fetchCollection: false });
        }
        if(this.state.savedSettings.length === 0 && this.props.scene.id !== 0){
            this.setState({savedSettings: this.buildSettingsArr()});

            window.addEventListener("beforeunload", (event) => {
                let finalSettings = this.buildSettingsArr();
    
                if(!this.settingsEqual(finalSettings)){
                    event.preventDefault();
                    event.returnValue = "You may have unsaved changes!";
                }
            });
        }
    }


    /**
     * Flatten the sceneSettings from props (object) into an array for comparason
     * @returns {array} Array of the scene settings
     */
    buildSettingsArr = () => {
        const sceneSettings = this.props.scene.settings;

        return [ sceneSettings.floorColor, 
            sceneSettings.showCoordHelper, sceneSettings.showFloor,
            sceneSettings.skyColor, sceneSettings.viewOnly];
    };
    
    /**
     * Compare two arrays of setting and determine whether is the settings are equal or not
     * @param {array} newSettings Settings to compare
     * @returns {boolean} If settings are equal or not
     */
    settingsEqual = (newSettings) =>{
        for(let i = 0; i < newSettings.length; ++i){
            if(newSettings[i] !== this.state.savedSettings[i]){
                return false;
            }
        }
        return true;
    }

    /**
     * The logout function runs when the user click to logout of the application.
     */
    logout = () => {
        // sync with application state
        this.props.logging.logout();
        this.props.projectActions.syncUserProj([]);
        this.setState({ logMenuOpen: false });
    }

    /**
     * The login function runs when the user click to login of the application.
     */
    login = (googleAuth) => {
        //googleAuth.getAuthResponse().id_token;
        googleAuth.profileObj["uid"] = googleAuth.getAuthResponse().id_token;
        this.props.logging.login(googleAuth.profileObj);
        this.setState({ logMenuOpen: false, googleUser: googleAuth });
        
        this.props.projectActions.asyncUserProj(this.props.user.uid);
        this.props.collectionActions.asyncCollections(this.props.user.uid);
        this.setRefreshTime(googleAuth.tokenObj.expires_at);

        //send uid to google analyrica
        window.gtag("config", "UA-122925714-1", {"user_id": this.props.user.googleId});
    }

    /**
     * Google auth token object has a expiration time that needed to be refresh after certain time period
     *      This function set the timeout and will refresh the token after it reach the time
     * @param {number} time The time when the token will expired 
     */
    setRefreshTime = (time) => {
        const oneMinute = 60*1000;
        let expiryTime = Math.max(
            oneMinute*5, //Default of 5 minutes
            time - Date.now() - oneMinute*5 // give 5 mins of breathing room
        );
        setTimeout(this.refreshToken, expiryTime);
    }

    /**
     * Refresh token when the time expires, update the token, and set the refresh time again
     */
    refreshToken = () => {
        this.state.googleUser.reloadAuthResponse().then((authResponse) => {
            this.props.logging.refreshToken(authResponse.id_token);
            this.setRefreshTime(authResponse.expires_at);
        });
    }

    /**
     * This function produces the DOM elements to display logging functionality
     */
    loginBtn = () => {
        return (
            <div id="user" >
                {this.props.user && this.props.user.name ?
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                        buttonText="Logout"
                        render={renderProps => (
                            <Fragment>
                                <Avatar
                                    id="login"
                                    src={this.props.user.imageUrl}
                                    open={this.state.logMenuOpen}
                                    onClick={() => this.setState({ logMenuOpen: !this.state.logMenuOpen })}
                                    label="logout"
                                    style={{ marginTop: 5 }} />
                                <Popover
                                    open={this.state.logMenuOpen}
                                    anchorEl={document.getElementById("user")}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                    onClose={this.handleLogClick} >
                                    <MenuItem primarytext="Log Out" onClick={renderProps.onClick}>Log Out</MenuItem>
                                </Popover>
                            </Fragment>
                        )}
                        onLogoutSuccess={this.logout}
                        onFailure={(err) => console.error("Could not logout: ", err) }
                    />
                    :
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                        buttonText="Login"
                        isSignedIn={true}
                        render={renderProps => (
                            <Button
                                type="button"
                                variant="outlined"
                                size="small"
                                color="primary"
                                onClick={renderProps.onClick}
                                style={{
                                    color: "white",
                                    margin: 4,
                                    padding: 2,
                                    border: "1px solid #fff"
                                }}>
                                    Log In
                            </Button>
                        )}
                        onSuccess={this.login}
                        onFailure={(err) => { console.error("Error logging in: ", err); }}
                    />
                }
            </div>
        );
    }

    /**
     * This function handles when the user wants to toggle the logging menu
     */
    handleLogClick = (event) => {
        event.preventDefault();
        this.setState({
            logMenuOpen: !this.state.logMenuOpen,
        });
    };

    /**
     * This sets the components current state to the input from the scene name form
     */
    handleNameChange = (event) => {
        this.props.sceneActions.nameScene(event.target.value);
    }

    /**
     * This sets the components current state to the input from the scene description form
     */
    handleDescChange = (event) => {
        this.props.sceneActions.setDesc(event.target.value);
    }

    /**
     * This function produces the form for inputting the scene's name and description
     */
    sceneName = () => {
        let sceneName = this.props.scene.name;
        let sceneDesc = this.props.scene.desc;
        return (
            <FormControl className="mt-2" aria-describedby="name-helper-text">
                <TextField id="name-helper"
                    value={sceneName ? sceneName : ""}
                    label="Scene Name"
                    placeholder={sceneName ? sceneName : "Untitled Scene"}
                    onBlur={this.handleNameChange}
                    onChange={this.handleNameChange} />
                <TextField
                    value={sceneDesc ? sceneDesc : ""}
                    onChange={this.handleDescChange}
                    onBlur={this.handleDescChange}
                    label="Description"
                    margin="normal"
                />
            </FormControl>
        );
    }

    /**
     * handeRender gets the information from Ace Editor and calls the action: render()
     */
    handleRender = () => {
        try {
            let editor = window.ace.edit("ace-editor");
            this.props.actions.render(editor.getSession().getValue(), this.props.user ? this.props.user.uid : "anon");
        } catch (error) {
            this.props.actions.render(this.props.text, this.props.user ? this.props.user.uid : "anon");
        }
    }

    /**
     * This function will determine which projectId to use when saving.
     *
     * @returns - projectId
     */
    getProjectId = () => {
        const { match } = this.props;
        let projectId = (match && match.params && match.params.id) || null;
        return projectId;
    }

    /**
     * @return Return a elements with spinner like effects if the spinnerOpen is true
     *              Use for when saving or loading a scene
     */
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
     * When the user clicks save it will upload the information to Firebase
     */
    handleSave = (newCollectionID = undefined) => {
        let editor, text;
        if (!this.props.viewOnly) {
            //If in editor mode, gets text directly from editor
            editor = window.ace.edit("ace-editor");
            text = editor.getSession().getValue();
        } else {
            //Otherwise, gets text from state (should be up to date since it is refreshed on editor unmount) 
            text = this.props.text;
        }

        if (this.props.user && this.props.user.uid && text) {
            this.setState({ spinnerOpen: true });
            let scene = document.querySelector("a-scene");
            // Access the scene and screen shot, with perspective view in a lossy jpeg format
            let img = scene.components.screenshot.getCanvas("perspective").toDataURL("image/jpeg", 0.1);

            let newScene = {
                name: (this.props.scene.name ? this.props.scene.name : "Untitled Scene"),
                desc: this.props.scene.desc,
                code: text,
                uid: this.props.user.uid,
                settings: {
                    ...this.props.scene.settings,
                    collectionID: newCollectionID || this.props.scene.settings.collectionID
                },
                updateTime: Date.now(),
                createTime: (this.props.scene.createTime ? this.props.scene.createTime : Date.now())
            };
            
            save(this.props.user.uid, newScene, img, this.props.projectId).then((projectId) =>{
                if(!projectId) {
                    console.error("Could not save the scene");
                }
                
                this.props.actions.updateSavedText(text);
                // If we have a new projectId reload page with it
                if (projectId !== this.props.projectId) {
                    this.setState({ spinnerOpen: false });
                    window.location.assign(`${window.origin}/scene/${projectId}`);
                    this.props.projectActions.asyncUserProj(this.props.user.uid);
                }
                if(!this.state.viewOnly) {
                    this.props.actions.refresh(text, this.props.user ? this.props.user.uid : "anon");
                }
                this.setState({spinnerOpen: false, saveOpen: false});
                this.state.socket.emit("save");
                return true;
            });
        } else if(!text) {
            alert("There is no code to save for this scene. Try adding some in the editor!");
        }else {
            // TODO: Don't use alert
            alert("We were unable to save your project. Are you currently logged in?");
        }

        if(!this.state.viewOnly) {
            this.props.actions.refresh(text, this.props.user ? this.props.user.uid : "anon");
        }
        this.setState({savedSettings: this.buildSettingsArr()});
    }

    /**
     * resets the current scene
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
     * toggles the save drawer
     */
    handleSaveToggle = () => this.setState({ saveOpen: !this.state.saveOpen });

    /**
     * forces save drawer closed
     */
    handleSaveClose = () => this.setState({ saveOpen: false });

    /**
     * forces save drawer closed
     */
    handleSaveOpen = () => this.setState({ saveOpen: true });

    /**
     * creates the save drawer
     */
    saveDrawer = () => {
        return (
            <Drawer
                variant="persistent"
                className="side-drawer"
                open={this.state.saveOpen}
                onClose={this.handleSaveToggle} >
                <IconButton variant="contained"
                    color="default"
                    style={exitBtnStyle}
                    onClick={this.handleSaveToggle}>
                    <Icon className="material-icons">close</Icon>
                </IconButton>
                <this.sceneName />
                <Button
                    variant="contained"
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
     * toggles the load project drawer
     */
    handleProjectToggle = () => {
        this.setState({ projectsOpen: !this.state.projectsOpen });
        this.setState({ projectTab: "a" });
    };

    /**
     * toggles the load welcome menu
     */
    handleWelcomeToggle = () => {
        this.setState({ welcomeOpen: !this.state.welcomeOpen });
    };

    /**
     * toggles the load courses drawer
     */
    handleCoursesToggle = () => {
        this.setState({ coursesOpen: !this.state.coursesOpen });
    };

    /**
     * toggles the load tour
     */
    handleTourToggle = () => {
        this.setState({ tourOpen: !this.state.tourOpen });
    };

    /**
     * toggles the load collection drawer
     */
    handleCollectionToggle = () => {
        this.setState({ collectionOpen: !this.state.collectionOpen });
    };

    /**
     * close the collection drawer
     */
    handleCollectionClose = () => {
        this.setState({ collectionOpen: false });
    };

    /**
     * toggles the load reference drawer
     */
    handleReferenceToggle = () => {
        this.setState({ referenceOpen: !this.state.referenceOpen });
    };

    /**
     * Handles when collection is deleted
     */
    handleCollectionDelete = (collectionID) => {
        if(this.props.scene.settings.collectionID === collectionID) {
            this.props.sceneActions.removeCollectionID(this.props.scene);
        }
    }

    /**
     * Return a collection component
     */
    loadCollection = () => {
        return (
            <Collection
                openCollection={this.props.collection}
                collections={this.props.collections}
                collectionActions={this.props.collectionActions}
                user={this.props.user}
                open={this.state.collectionOpen}
                handleCollectionToggle={this.handleCollectionToggle}
                handleCollectionClose={this.handleCollectionClose} 
                deleteCallback={this.handleCollectionDelete} />
        );
    }

    /**
     * closes the snackbar that displays the message from render
     */
    closeSnackBar = () => {
        this.setState({ snackOpen: false });
    }

    /**
     * Display the snackbar that displays the message from render
     */
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
     * creates the header and links the buttons
     */
    render() {
        const style = {
            play: {
                margin: 5,
                background: "linear-gradient(45deg, #38e438 30%, #58e458 90%)",
            },
            play_disabled: {
                margin: 5,
                padding: 0,
                background: "#222",
                border: "2px solid",
                borderColor: "#777",
            },
            clear: {
                margin: 5,
                marginRight: 10,
                padding: 0,
                background: "linear-gradient(45deg, #FE3B3B 30%, #FF3B3B 90%)",
            },
            clear_disabled: {
                margin: 5,
                marginRight: 10,
                padding: 0,
                background: "#222",
                border: "2px solid",
                borderColor: "#777",
            },
            default: {
                margin: 2,
                color: "#fff",
            },
            disabled: {
                margin: 2,
                color: "#777",
            },
        };
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: "#3f51b5",
                }
            }
        });
        const referenceMode = this.props.layoutType === layoutTypes.REFERENCE;
        return (
            <header className="App-header align-items-center ">
                <div className="col-9 d-flex justify-content-start" style={{ paddingLeft: 0 }}>
                    <Sidebar scene={this.props.scene} nameScene={this.props.sceneActions.nameScene} >
                        <Button
                            variant="contained"
                            onClick={() => { window.location.assign(window.origin); }}
                            color="primary"
                            className="sidebar-btn">
                            <Icon className="material-icons">add</Icon>
                            Start New
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.props.actions.recover}
                            color="primary"
                            className="sidebar-btn"
                            disabled={referenceMode}>
                            <Icon className="material-icons">replay</Icon>
                            Recover
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.handleSaveToggle}
                            color="primary"
                            className="sidebar-btn"
                            disabled={referenceMode}>
                            <Icon className="material-icons">save</Icon>
                            Save Project
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.handleProjectToggle}
                            color="primary"
                            className="sidebar-btn">
                            <Icon className="material-icons">perm_media</Icon>
                            Open Project
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.handleCollectionToggle}
                            color="primary"
                            className="sidebar-btn">
                            <Icon className="material-icons">assignment</Icon>
                            Collections
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.handleWelcomeToggle}
                            color="primary"
                            className="sidebar-btn">
                            <Icon className="material-icons">wb_iridescent</Icon>
                            Show Welcome Screen
                        </Button>
                    </Sidebar>
                    <h1 className="mr-2 d-none d-sm-block"
                        style={{ cursor: "pointer" }}
                        onClick={() => { window.location.assign(window.origin); }} >
                        MYR
                    </h1>
                    <MuiThemeProvider theme={theme}>
                        <Tooltip title="Render" placement="bottom-start">
                            <Button
                                id="play-btn"
                                variant={referenceMode ? "outlined" : "contained"}
                                size="small"
                                onClick={() => {
                                    this.clear();
                                    this.postpone(this.handleRender);
                                }}
                                color="primary"
                                className="header-btn"
                                style={referenceMode ? style.play_disabled : style.play}
                                disabled={referenceMode}>
                                <Icon className="material-icons" style={referenceMode ? { color: "#777" } : { color: "#222" }}>play_arrow</Icon>
                            </Button>
                        </Tooltip>
                        <WelcomeScreen
                            handleWelcomeToggle={this.handleWelcomeToggle}
                            welcomeOpen={this.state.welcomeOpen}
                            deleteFunc={this.props.projectActions.deleteProj}
                            userProjs={this.props.projects.userProjs}
                            exampleProjs={this.props.projects.exampleProjs}
                            courses={this.props.courses.courses}
                            handleTourToggle={this.handleTourToggle} />
                        <Tooltip title="Stop" placement="bottom-start">
                            <Button
                                id="stop-btn"
                                variant={referenceMode ? "outlined" : "contained"}
                                size="small"
                                onClick={this.clear}
                                color="primary"
                                className="header-btn"
                                style={referenceMode ? style.clear_disabled : style.clear}
                                disabled={referenceMode}>
                                <Icon className="material-icons" style={referenceMode ? { color: "#777" } : { color: "#222" }}>stop</Icon>
                            </Button>
                        </Tooltip>
                    </MuiThemeProvider>
                    <Tooltip title="New Scene" placement="bottom-start">
                        <IconButton
                            id="new-btn"
                            onClick={() => { window.location.assign(window.origin); }}
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
                            style={referenceMode ? style.disabled : style.default}
                            disabled={referenceMode}>
                            <Icon className="material-icons">save</Icon>
                        </IconButton>
                    </Tooltip>
                    <ProjectView
                        deleteFunc={this.props.projectActions.deleteProj}
                        userProjs={this.props.projects.userProjs}
                        exampleProjs={this.props.projects.exampleProjs}
                        projectsOpen={this.state.projectsOpen}
                        handleProjectToggle={this.handleProjectToggle}
                        tab={this.state.projectTab}
                        user={this.props.user} />
                    <MyrTour
                        tourOpen={this.state.tourOpen}
                        handleTourToggle={this.handleTourToggle}
                        viewOnly={this.props.scene.settings.viewOnly}
                        changeView={this.props.sceneActions.changeView}
                        layoutType={this.props.layoutType}
                        referenceOpen={this.state.referenceOpen}
                        handleReferenceToggle={this.handleReferenceToggle} />
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <Reference
                        layoutType={this.props.layoutType}
                        referenceOpen={this.state.referenceOpen}
                        handleReferenceToggle={this.handleReferenceToggle} />
                    <SceneConfigMenu
                        scene={this.props.scene}
                        sceneActions={this.props.sceneActions}
                        collectionActions={this.props.collectionActions}
                        user={this.props.user}
                        handleRender={this.handleRender}
                        handleSave={this.handleSave}
                        handleSaveClose={this.handleSaveClose}
                        layoutType={this.props.layoutType}
                        displayCollectionConfig={!this.props.collection}
                    />
                    <CourseSelect
                        coursesOpen={this.state.coursesOpen}
                        handleCoursesToggle={this.handleCoursesToggle}
                        courses={this.props.courses.courses} />
                    <this.loginBtn />
                </div>
                <this.saveDrawer />
                <this.renderSnackBar />
                <this.spinner />
                <this.loadCollection />
            </header >
        );
    }

    /**
     * You can pass functions into this in order to have
     * multiple setState/state actions dispatched within an event handler
     * Currently only used for render button
     * 
     * @param {function} f Function to call after the timeout
     */
    postpone(f) {
        window.setTimeout(f, 0);
    }
}

export default Header;
