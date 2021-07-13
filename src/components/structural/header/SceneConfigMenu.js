import React, { Component } from "react";
import { ChromePicker } from "react-color";
import {
    Button,
    ButtonBase,
    IconButton,
    Icon,
    Modal,
    Slider,
    TextField,
    Tooltip,
    Tabs,
    Tab
} from "@material-ui/core";

import QRCode from "qrcode.react";

import { withStyles } from "@material-ui/core/styles";

import * as layoutTypes from "../../../constants/LayoutTypes.js";

import "../../../css/SceneConfig.css";

/**
 * FUNC to position modal in the middle of the screen
 */
function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        maxWidth: "90%",
        minHeight: 400
    };
}

/**
 * CSS for modal
 * 
 * @param {*} theme 
 */
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    }
});

/**
 * CSS for buttons
 */
const btnStyle = {
    base: {
        marginTop: 20,
        justifyContent: "left",
        width: "100%"
    },
    on: {
        color: "#3f51b5",
    },
    off: {
        color: "#333",
    },
    save: {
        padding: 5,
        margin: 5,
        color: "#333",
        width: "100%"
    },
    cancel: {
        padding: 5,
        margin: 5,
        color: "red",
        width: "100%"
    }
};

class ConfigModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            displaySkyColorPicker: false,
            displayFloorColorPicker: false,
            displayMoveSpeedSlider: false,
            qrCodeOpen: false,
            shareOpen: false,
            addClassOpen: false,
            defaultLight: true,
            castShadow: false,
            spawnLightIndicator: false,
            skyColor: this.props.scene.settings.color,
            moveSpeed: this.props.scene.settings.moveSpeed,
            anchorEl: null,
            email: "",
            sendTo: [],
            collectionID: "",
            value: "a",
            collectionError: ""
        };
        this.emailRef = React.createRef();
    }

    /**
     * Opens the modal
     */
    handleOpen = () => {
        this.setState({ open: true });
    };

    /**
     * Closes the modal
     */
    handleClose = () => {
        this.setState({ 
            open: false, 
            displaySkyColorPicker: false, 
            displayFloorColorPicker: false,
            displayMoveSpeedSlider: false
        });
    };

    // handleClick = event => {
    //     this.setState({ anchorEl: event.currentTarget, projectId: event.currentTarget.id });
    // };

    /**
     * Handles when the text change in the textfield. Use in mail share and collection
     * @param {string} name Place where it saved in state
     */
    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    /**
     * Handles when the user add the new email address to send
     */
    handleAddEmail = () => {
        let arr = [].concat(this.state.sendTo);
        arr.push(this.state.email);
        this.emailRef.current.value = "";
        this.setState({ sendTo: arr, email: "" });
    };

    /**
     * Handles toggle the qrcode menu
     */
    handleQrToggle = () => {
        this.setState({ qrCodeOpen: !this.state.qrCodeOpen });
    };
    
    /**
     * Handles toggle the share menu
     */
    handleShrToggle = () => {
        this.setState({ shareOpen: !this.state.shareOpen, sendTo: [] });
    };

    /**
     * Email field where user enters addresses they want to share it with
     */
    shareOptions = () => (
        <div>
            <h5>Enter one or more email addresses</h5>
            {
                this.state.sendTo.map((it, index) => {
                    return <p key={index}>{it}</p>;
                })
            }
            <TextField
                id="standard-name"
                label="Email"
                inputRef={this.emailRef}
                onChange={this.handleTextChange("email")}
            />
            <IconButton
                variant="contained"
                onClick={this.handleAddEmail}
                color="primary">
                <Icon className="material-icons">add</Icon>
            </IconButton>
            <Button
                color="primary"
                onClick={this.handleAddEmail}
                href={`mailto:${this.state.sendTo.join("; ")}?subject=Check out my VR Scene in MYR&body=You can find my scene at ${window.location.href}`}>
                Send
            </Button>
        </div>
    );

    /**
     * QR Code of the link to the project
     */
    qrCodeOpen = () => {
        return (
            <div>
                <h5>QR Code to Your Project</h5>
                <QRCode size={330} value={window.location.href} />
            </div>
        );
    };

    /**
     * Toggles the grid on and off
     */
    toggleGrid = () => {
        this.props.sceneActions.toggleCoordSky();
    };

    /**
     * Update the state and dispatch an action to change the skycolor 
     * @param {object} color object contains "hex" key
     */
    handleSkyChangeComplete = (color) => {
        this.setState({ skyColor: color.hex });
        this.props.sceneActions.changeSkyColor(color.hex);
    };

    /**
     * Update the state and dispatch an action to change the floorcolor 
     * @param {object} color object contains "hex" key
     */
    handleFloorChangeComplete = (color) => {
        this.setState({ floorColor: color.hex });
        this.props.sceneActions.changeFloorColor(color.hex);
    };


    /** 
     * Update component state whenever the slider's value changes
     * so text displays correctly, only update redux store on 
     * mouseup when user drags slider 
     * 
     * @param {object} e input from mouse
     * @param {number} newSpeed updated value
     */
    handleMoveSpeedUpdate = (e, newSpeed) => {
        this.setState({ moveSpeed: newSpeed });
        if(!e || e.type === "mouseup") {
            this.props.sceneActions.updateMoveSpeed(newSpeed);
        }
    };

    /**
     * Toggle the color picker for skyColor
     */
    handleSkyColorClick = () => {
        this.setState({ displaySkyColorPicker: !this.state.displaySkyColorPicker });
    };

    /**
     * Toggle the color picker for floorColor
     */
    handleFloorColorClick = () => {
        this.setState({ displayFloorColorPicker: !this.state.displayFloorColorPicker });
    };


    handleMoveSpeedClick = () => {
        this.setState({ displayMoveSpeedSlider: !this.state.displayMoveSpeedSlider });
    };

    /**
     * Close the color picker for skyColor
     */
    handleSkyColorClose = () => {
        this.setState({ displaySkyColorPicker: false });
    };

    /**
     * Close the color picker for floorColor
     */
    handleFloorColorClose = () => {
        this.setState({ displayFloorColorPicker: false });
    };

    /**
     * Return button for toggles whether the editor is showing
     */
    viewToggle = () => {
        let style = this.props.scene.settings.viewOnly ? btnStyle.off : btnStyle.on;

        style = { ...btnStyle.base, ...style };
        return (
            <ButtonBase
                style={style}
                onClick={() => {
                    return this.props.sceneActions.changeView();
                }
                }
            >
                {
                    !this.props.scene.settings.viewOnly
                        ? <Icon className="material-icons">toggle_on</Icon>
                        : <Icon className="material-icons">toggle_off</Icon>
                }
                Show Editor
            </ButtonBase >
        );
    };

    /**
     * Return button for toggles the grid on and off
     */ 
    gridToggle = () => {
        let style = this.props.scene.settings.showCoordHelper ? btnStyle.on : btnStyle.off;
        style = { ...btnStyle.base, ...style };
        return (
            <ButtonBase
                style={style}
                onClick={() => {
                    this.props.handleRender();
                    this.props.sceneActions.toggleCoordSky();
                }} >
                {
                    this.props.scene.settings.showCoordHelper
                        ? <Icon className="material-icons">toggle_on</Icon>
                        : <Icon className="material-icons">toggle_off</Icon>
                }
                Show Grid
            </ButtonBase >
        );
    };

    /**
     * Return button for toggles the default light on and off
     */
    defaultLightToggle = () =>{
        let style = this.props.scene.settings.defaultLight ? btnStyle.on : btnStyle.off;
        style = { ...btnStyle.base, ...style };
        return (
            <ButtonBase
                style={style}
                onClick={() => {
                    this.props.handleRender();
                    this.props.sceneActions.toggleDefaultLight();
                    this.setState({ settingsChanged: true });
                }} >
                {
                    this.props.scene.settings.defaultLight
                        ? <Icon className="material-icons">toggle_on</Icon>
                        : <Icon className="material-icons">toggle_off</Icon>
                }
                Default Light
            </ButtonBase >
        );
    };

    /**
     * Return button for toggles the shadow on and off
     */
    castShadowToggle = () => {
        let style = this.props.scene.settings.castShadow ? btnStyle.on : btnStyle.off;
        style = { ...btnStyle.base, ...style };
        return (
            <ButtonBase
                style={style}
                onClick={() => {
                    this.props.handleRender();
                    this.props.sceneActions.toggleCastShadow();
                    this.setState({ settingsChanged: true });
                }} >
                {
                    this.props.scene.settings.castShadow
                        ? <Icon className="material-icons">toggle_on</Icon>
                        : <Icon className="material-icons">toggle_off</Icon>
                }
                Cast Shadow
            </ButtonBase >
        );
    };

    /**
     * Return button for toggles the light indicator on and off
     */
    lightIndicatorToggle = () => {
        let style = this.props.scene.settings.lightIndicator ? btnStyle.on : btnStyle.off;
        style = { ...btnStyle.base, ...style };
        return (
            <ButtonBase
                style={style}
                onClick={() => {
                    this.props.handleRender();
                    this.props.sceneActions.toggleLightIndicator();
                    this.setState({ settingsChanged: true });
                }} >
                {
                    this.props.scene.settings.lightIndicator
                        ? <Icon className="material-icons">toggle_on</Icon>
                        : <Icon className="material-icons">toggle_off</Icon>
                }
                Light Indicator
            </ButtonBase >
        );
    };

    /**
     * Return button for toggles the floor on and off
     */
    floorToggle = () => {
        let style = this.props.scene.settings.showFloor ? btnStyle.on : btnStyle.off;
        style = { ...btnStyle.base, ...style };
        return (
            <ButtonBase
                style={style}
                onClick={() => {
                    this.props.handleRender();
                    this.props.sceneActions.toggleFloor();  
                }} >
                {
                    this.props.scene.settings.showFloor
                        ? <Icon className="material-icons">toggle_on</Icon>
                        : <Icon className="material-icons">toggle_off</Icon>
                }
                Show Floor
            </ButtonBase >
        );
    };

    /**
     * Return button for toggles addCollection menu
     */
    addCollectionToggle = () => {
        return (
            <ButtonBase
                style={btnStyle.base}
                onClick={this.handleAddClassToggle}
            >
                <Icon className="material-icons">library_add</Icon>
                Add to Collection
            </ButtonBase >
        );
    };

    /**
     * Handle toggle of addCollection menu
     */
    handleAddClassToggle = () => {
        this.setState({ addClassOpen: !this.state.addClassOpen, collectionError: "" });
    };


    /**
     * Returns button for shows collection info
     */
    classInfoToggle = () => {
        return (
            <ButtonBase
                style={btnStyle.base}
                onClick={() => window.open(window.origin + "/about/collections")} >
                <Icon className="material-icons">info</Icon>
                About Collections
            </ButtonBase >
        );
    };

    /**
     * Returns elements for addCollections menu
     */
    addClass = () => (
        <div>
            <h5>Please enter your collection name.</h5>
            {this.props.scene && this.props.scene.settings.collectionID ? <p>{"Current collection: " + this.props.scene.settings.collectionID}</p> : null}
            {this.state.collectionError ? <p style={{color: "red"}}>{`Error: ${this.state.collectionError}`}</p> : null}
            <TextField
                id="standard-name"
                type="text"
                onChange={this.handleTextChange("collectionID")}
            />
            <Button
                color="primary"
                onClick={() => {
                    let collectionID = this.state.collectionID.toLowerCase().trim();

                    fetch(`/apiv1/collections/collectionID/${collectionID}/exists`).then((resp) => {
                        if(resp.status === 200){
                            this.handleAddClassToggle();
                            this.props.sceneActions.addCollectionID(collectionID);
                            this.props.handleSave(collectionID);
                            this.props.handleSaveClose();
                            this.setState({collectionError: ""});
                        }else{
                            this.setState({collectionError: `Collection ${collectionID} does not exist!`});
                        }
                    });
                }} >
                Save
            </Button>
        </div>
    );

    /**
     * Resets the camera, but also applies a small random num to make it reset
     * See reducer for more info
     */
    resetPosition = () => {
        return (
            <ButtonBase
                style={btnStyle.base}
                onClick={() => this.props.sceneActions.setCamera(0, 1.6, 3)} >
                <Icon className="material-icons">settings_backup_restore</Icon>
                Reset Position
            </ButtonBase >
        );
    };

    /**
     * Returns button for open speed slider
     */
    updateMoveSpeed = () => {
        return (
            <ButtonBase
                style={btnStyle.base}
                onClick={() => {
                    this.props.handleRender();
                    this.handleMoveSpeedClick();
                }}>
                <Icon className="material-icons">tune</Icon>
                Change Speed
            </ButtonBase >
        );
    };

    /**
     * Returns button for open color picker for skyColor
     */
    changeSkyColor = () => {
        return (
            <ButtonBase
                style={btnStyle.base}
                onClick={() => {
                    this.props.handleRender();
                    this.handleSkyColorClick();
                }}>
                <Icon className="material-icons">color_lens</Icon>
                Edit Sky Color
            </ButtonBase>
        );
    };

    /**
     * Returns button for open color picker for floorColor
     */
    changeFloorColor = () => {
        return (
            <ButtonBase
                style={btnStyle.base}
                onClick={() => {
                    this.props.handleRender();
                    this.handleFloorColorClick();
                }}>
                <Icon className="material-icons">color_lens</Icon>
                Edit Floor Color
            </ButtonBase>
        );
    };

    /**
     * Handles the switch between scene and share tab
     * @param {*} event 
     * @param {string} value New tab string 
     */
    handleChange = (event, value) => {
        this.setState({ value });
    };

    /**
     * Create sceneConfig menu
     */
    render() {
        const { classes } = this.props;
        let isDisabled = this.props.layoutType === layoutTypes.REFERENCE;
        return (
            <div>
                {!isDisabled ?
                    <div>
                        <Tooltip title="Scene Settings">
                            <IconButton
                                onClick={this.handleOpen}
                                id="configure-scene"
                                style={{
                                    color: "#fff",
                                    margin: 2,
                                }}>
                                <Icon className="material-icons">settings</Icon>
                            </IconButton >
                        </Tooltip>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose} >
                            <div style={getModalStyle()} className={classes.paper}>
                                <ButtonBase
                                    style={{ position: "absolute", right: 15, top: 15 }}
                                    onClick={() => this.handleClose()} >
                                    <Icon className="material-icons">clear</Icon>
                                </ButtonBase >
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}>
                                    <Tab
                                        label="Scene"
                                        value="a" />
                                    <Tab
                                        label="Sharing"
                                        value="b" />
                                </Tabs>
                                {this.state.value === "a" &&
                                    <div style={{ marginTop: 0 }}>
                                        <div className="row d-flex">
                                            <div className="col-12 border-bottom pt-4">View Control</div>
                                            <div className="col-6">
                                                <this.viewToggle />
                                                <this.floorToggle />
                                                <this.gridToggle />
                                            </div>
                                            <div className="col-6">
                                                <this.changeSkyColor />
                                                <this.changeFloorColor />
                                            </div>
                                            <div className="col-12 border-bottom pt-4">Light Control</div>
                                            <div className="col-6">
                                                <this.defaultLightToggle/>
                                                <this.castShadowToggle/>
                                            </div>
                                            <div className="col-6">
                                                <this.lightIndicatorToggle/>
                                            </div>
                                            <div className="col-12 border-bottom pt-4">Camera Control</div>
                                            <div className="col-6">
                                                <this.updateMoveSpeed />
                                            </div>
                                            <div className="col-6">
                                                <this.resetPosition />
                                            </div>
                                            {this.state.displaySkyColorPicker
                                                ?
                                                <div id="color-popover">
                                                    <ButtonBase
                                                        onClick={this.handleSkyColorClose}
                                                        style={{ position: "absolute", right: -25, top: -17, zIndex: 100 }}>
                                                        <Icon className="material-icons">clear</Icon>
                                                    </ButtonBase >
                                                    <div id="color-cover" onClick={this.handleSkyColorClose} />
                                                    <ChromePicker 
                                                        disableAlpha={true}
                                                        color={this.state.skyColor}
                                                        onChangeComplete={this.handleSkyChangeComplete} />
                                                </div>
                                                :
                                                null
                                            }
                                            {this.state.displayFloorColorPicker
                                                ?
                                                <div id="color-popover">
                                                    <ButtonBase
                                                        onClick={this.handleFloorColorClose}
                                                        style={{ position: "absolute", right: -25, top: -17, zIndex: 100 }}>
                                                        <Icon className="material-icons">clear</Icon>
                                                    </ButtonBase >
                                                    <div id="color-cover" onClick={this.handleFloorColorClose} />
                                                    <ChromePicker
                                                        disableAlpha={true}
                                                        color={this.state.floorColor}
                                                        onChangeComplete={this.handleFloorChangeComplete} />
                                                </div>
                                                :
                                                null
                                            }
                                            {this.state.displayMoveSpeedSlider
                                                ?
                                                <div id="speed-config" className="col-12 pt-4">
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <Slider
                                                                value={this.state.moveSpeed}
                                                                valueLabelDisplay="auto" 
                                                                onChange={this.handleMoveSpeedUpdate}
                                                                onChangeCommitted={this.handleMoveSpeedUpdate}
                                                                min={0}
                                                                max={1000} />
                                                        </div>
                                                        <div className="col-3 align-top">
                                                            <ButtonBase
                                                                onClick={() => this.handleMoveSpeedUpdate(null, 150)}>
                                                                <Icon className="material-icons">settings_backup_restore</Icon>
                                                                Reset
                                                            </ButtonBase >
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>}
                                {this.state.value === "b" &&
                                    <div style={{ marginTop: 0 }}>
                                        <div className="row d-flex">
                                            <div className="col-12 border-bottom pt-4">Privacy Control</div>
                                            <div className="col-6">
                                                <ButtonBase
                                                    style={btnStyle.base}
                                                    onClick={() => { this.handleQrToggle(); }} >
                                                    <Icon className="material-icons">gradient</Icon>
                                                    QR Code
                                                </ButtonBase>
                                            </div>
                                            <div className="col-6">
                                                <ButtonBase
                                                    style={btnStyle.base}
                                                    onClick={() => { this.handleShrToggle(); }} >
                                                    <Icon className="material-icons">send</Icon>
                                                    Send To
                                                </ButtonBase>
                                            </div>
                                            <div className="col-12 border-bottom pt-4">Collection Control</div>
                                            {this.props.displayCollectionConfig ? 
                                                <div className="col-6">
                                                    <this.addCollectionToggle />
                                                </div>
                                                :
                                                <></>
                                            }
                                            <div className="col-6">
                                                <this.classInfoToggle />
                                            </div>
                                        </div>
                                    </div>}

                                {/* This is for the dual button config
                                            <div className="col-6">
                                                <ButtonBase
                                                    style={btnStyle.cancel}
                                                    onClick={() => this.handleClose()} >
                                                    Cancel
                                                </ButtonBase >
                                        </div> */}
                            </div>
                        </Modal >
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.qrCodeOpen}
                            onClose={this.handleQrToggle} >
                            <div style={getModalStyle()} className={classes.paper}>
                                <ButtonBase
                                    style={{ position: "absolute", right: 15, top: 15 }}
                                    onClick={() => this.handleQrToggle()} >
                                    <Icon className="material-icons">clear</Icon>
                                </ButtonBase >
                                <this.qrCodeOpen />
                            </div>
                        </Modal>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.shareOpen}
                            onClose={this.handleShrToggle} >
                            <div style={getModalStyle()} className={classes.paper}>
                                <ButtonBase
                                    style={{ position: "absolute", right: 15, top: 15 }}
                                    onClick={() => this.handleShrToggle()} >
                                    <Icon className="material-icons">clear</Icon>
                                </ButtonBase >
                                <this.shareOptions />
                            </div>
                        </Modal>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.addClassOpen}
                            onClose={this.handleAddClassToggle} >
                            <div style={getModalStyle()} className={classes.paper}>
                                <ButtonBase
                                    style={{ position: "absolute", right: 15, top: 15 }}
                                    onClick={() => this.handleAddClassToggle()} >
                                    <Icon className="material-icons">clear</Icon>
                                </ButtonBase >
                                <this.addClass />
                            </div>
                        </Modal>
                    </div > : null}
            </div>
        );
    }
}

const SceneConfigMenu = withStyles(modelStyles)(ConfigModal);

export default SceneConfigMenu;
