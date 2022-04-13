import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";
import "brace/ext/searchbox";
import "brace/ext/language_tools";

import customCompleter from "./customCompleter.js";
import KeyboardShortcut from "./KeyboardShortcut.js";
import { browserType } from "../../utils/browserType";
import FontSize from "./FontSize.js";
import Reference from "../reference/Reference.js";
import SceneConfigMenu from "../structural/header/SceneConfigMenu.js";
import { save } from "../../actions/projectActions.js";


import sockets from "socket.io-client";



import "../../css/App.css";

import {
    createTheme,
    ThemeProvider,
} from "@material-ui/core";

/**
 * Editor is a React Component that creates the Ace Editor in the DOM.
 */
class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referenceOpen: false,
            assetReferenceOpen: false,
            savedSettings: [],


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
            coursesOpen: false,
            tourOpen: false,
            welcomeOpen: false,
            updateCollection: false,
            fetchCollection: false,
            socket: sockets(),
            googleUser: undefined
        };
    }

    /**
     * Called when the Edtior is unmounting (Being removed from the DOM)
     * 
     * Editor will unmount when MYR enters ViewOnly mode, and we want to render
     * whatever the code that's in the editor.
     */
    componentWillUnmount() {
        // Updates state in reducer before closing editor
        const text = window.ace.edit("ace-editor").getSession().getValue();
        this.props.refresh(text, this.props.user ? this.props.user.uid : "anon");

        // Forces render cycle so user sees up to date view when viewonly loads
        this.props.render(text);
    }

    /**
     * Called when the Editor is mounted (component has been rendererd to the DOM)
     * 
     * It sets custom completer of MYR API to editor, 
     * and add listener to check whether user have unsaved changes.
     */
    componentDidMount() {
        try {
            // eslint-disable-next-line
            this.refs.aceEditor.editor.completers = [customCompleter];
        } catch (error) {
            console.error("Unable to attach custom completers");
        }

        if (this.props.refExName) {
            this.props.referenceExampleActions.fetchReferenceExample(this.props.refExName);
        }
        // Warn the issue before refreshing the page
        window.addEventListener("beforeunload", (event) => {
            let text;
            try {
                let editor = window.ace.edit("ace-editor");
                text = editor.getSession().getValue();

            } catch (err) {
                console.error(err);
            }
            if (this.props.savedText !== text) {
                event.preventDefault();
                event.returnValue = "You may have unsaved scene changes!";
            }
        });

        this.setState({"previousSettings":this.props.settings});
    }

    /**
     * Called when the editor is loaded.
     * It sets options to set the maximum error editor accepts and set the EMCAScript version to 6
     */
    onLoad() {
        window.ace.edit("ace-editor").session.$worker.send("setOptions", [{
            "maxerr": 1000,
            "esversion": 6
        }]);
    }

    componentDidUpdate(){
        if(JSON.stringify(this.state.previousSettings) !== JSON.stringify(this.props.settings) &&
        this.props.user) {
            this.props.userActions.updateUserSettings(this.props.user.uid,this.props.settings);
            this.setState({"previousSettings":this.props.settings});
        }
        /*if (this.state.savedSettings.length === 0 && this.props.scene.id !== 0) {
            this.setState({ savedSettings: this.buildSettingsArr() });

            window.addEventListener("beforeunload", (event) => {
                let finalSettings = this.buildSettingsArr();

                if (!this.settingsEqual(finalSettings)) {
                    event.preventDefault();
                    event.returnValue = "You may have unsaved changes!";
                }
            });
        }  */ 
    }

    /**
     * Flatten the sceneSettings from props (object) into an array for comparason
     * @returns {array} Array of the scene settings
     */
    buildSettingsArr = () => {
        const sceneSettings = this.props.scene.settings;
    
        return [sceneSettings.floorColor,
            sceneSettings.showCoordHelper, sceneSettings.showFloor,
            sceneSettings.skyColor, sceneSettings.viewOnly];
    };
    /**
         * Compare two arrays of setting and determine whether is the settings are equal or not
         * @param {array} newSettings Settings to compare
         * @returns {boolean} If settings are equal or not
         */
    settingsEqual = (newSettings) => {
        for (let i = 0; i < newSettings.length; ++i) {
            if (newSettings[i] !== this.state.savedSettings[i]) {
                return false;
            }
        }
        return true;
    }

    handleReferenceToggle = () => {
        this.setState({ referenceOpen: !this.state.referenceOpen });
    };

    handleAssetReferenceToggle = () => {
        this.setState({ assetReferenceOpen: !this.state.assetReferenceOpen });
    };

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

            save(this.props.user.uid, newScene, img, this.props.projectId).then((projectId) => {
                if (!projectId) {
                    console.error("Could not save the scene");
                }

                this.props.actions.updateSavedText(text);
                // If we have a new projectId reload page with it
                if (projectId !== this.props.projectId) {
                    this.setState({ spinnerOpen: false });
                    window.location.assign(`${window.origin}/scene/${projectId}`);
                    this.props.projectActions.asyncUserProj(this.props.user.uid);
                }
                if (!this.state.viewOnly) {
                    this.props.actions.refresh(text, this.props.user ? this.props.user.uid : "anon");
                }
                this.setState({ spinnerOpen: false, saveOpen: false });
                this.state.socket.emit("save");
                return true;
            });
        } else if (!text) {
            alert("There is no code to save for this scene. Try adding some in the editor!");
        } else {
            // TODO: Don't use alert
            alert("We were unable to save your project. Are you currently logged in?");
        }

        if (!this.state.viewOnly) {
            this.props.actions.refresh(text, this.props.user ? this.props.user.uid : "anon");
        }
        this.setState({ savedSettings: this.buildSettingsArr() });
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
     * Creates the editor in the DOM
     */
    render() {
        const keyTheme = createTheme({
            palette: {
                primary: {
                    main: "#ffeb3b",
                },
                secondary: {
                    main: "#9c27b0",
                }
            },
        });
        const refTheme = createTheme({
            palette: {
                primary: {
                    main: "#a31545",
                },
                secondary: {
                    main: "#4caf50"
                },
            },
        });
        return (
            <div id="leftConsole">
                <AceEditor
                    editorProps={{
                        $blockScrolling: Infinity,
                    }}
                    height="86.5vh"
                    mode="javascript"
                    name="ace-editor"
                    // eslint-disable-next-line
                    ref="aceEditor"
                    theme="github"
                    fontSize = {this.props.settings.fontSize}
                    value={this.props.text}
                    width="100%"
                    wrapEnabled={true}
                    enableBasicAutocompletion={false}
                    enableLiveAutocompletion={true}
                    onLoad={this.onLoad}
                />
                { browserType() === "desktop" ? <div className="console-footer">
                    <ThemeProvider theme={keyTheme}>
                        <KeyboardShortcut/> 
                    </ThemeProvider>
                    <ThemeProvider theme={keyTheme}>
                        <FontSize userActions={this.props.userActions} settings={this.props.settings}/>
                    </ThemeProvider>
                    <ThemeProvider theme={refTheme}>
                        <Reference
                            layoutType={this.props.layoutType}
                            referenceOpen={this.state.referenceOpen}
                            assetReferenceOpen={this.state.assetReferenceOpen}
                            handleAssetReferenceToggle={this.handleAssetReferenceToggle}
                            handleReferenceToggle={this.handleReferenceToggle} />
                    </ThemeProvider>

                    <ThemeProvider>
                        <SceneConfigMenu
                            scene={this.props.scene}
                            sceneActions={this.props.sceneActions}
                            collectionActions={this.props.collectionActions}
                            user={this.props.user}
                            settings={this.props.settings}
                            userActions={this.props.userActions}
                            handleRender={this.handleRender}
                            handleSave={this.handleSave}
                            handleSaveClose={this.handleSaveClose}
                            layoutType={this.props.layoutType}
                            displayCollectionConfig={!this.props.collection}
                        />
                    </ThemeProvider>

                </div> : null }
            </div>
        );
    }
}

export default Editor;
