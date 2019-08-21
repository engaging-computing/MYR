import React, { Component } from "react";
import { ChromePicker } from "react-color";
import {
    Button,
    ButtonBase,
    IconButton,
    Icon,
    Modal,
    TextField,
    Tooltip,
    Tabs,
    Tab
} from "@material-ui/core";

import QRCode from "qrcode.react";

import { withStyles } from "@material-ui/core/styles";

import * as layoutTypes from "../../../constants/LayoutTypes.js";

import "../../../css/SceneConfig.css";

// FUNC to position modal in the middle of the screen
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

// CSS for modal
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

// CSS for buttons
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
            skyColor: this.props.scene.settings.color,
            displaySkyColorPicker: false,
            displayFloorColorPicker: false,
            anchorEl: null,
            qrCodeOpen: false,
            pwProtectOpen: false,
            shareOpen: false,
            addClassOpen: false,
            email: "",
            sendTo: [],
            collectionID: "",
            value: "a"
        };
        this.emailRef = React.createRef();
    }

    // Opens the modal
    handleOpen = () => {
        this.setState({ open: true });
    };

    // Closes the modal
    handleClose = () => {
        this.setState({ open: false, displaySkyColorPicker: false, displayFloorColorPicker: false });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget, projectId: event.currentTarget.id });
    };

    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleAddEmail = () => {
        let arr = [].concat(this.state.sendTo);
        arr.push(this.state.email);
        this.emailRef.current.value = "";
        this.setState({ sendTo: arr, email: "" });
    };

    handleQrToggle = () => {
        this.setState({ qrCodeOpen: !this.state.qrCodeOpen });
    };

    handlePwToggle = () => {
        this.setState({ pwProtectOpen: !this.state.pwProtectOpen });
    };

    handleShrToggle = () => {
        this.setState({ shareOpen: !this.state.shareOpen, sendTo: [] });
    };

    pwProtect = () => (
        <div>
            <h5>Please enter a PW.</h5>
            <TextField
                id="standard-name"
                type="password"
                onChange={this.handleTextChange("pw")}
            />
            <Button
                color="primary"
                onClick={() => {
                    this.handlePwToggle();
                    this.props.sceneActions.addPassword(this.state.pw);
                }} >
                Save
            </Button>
            <p style={{ fontSize: "80%", marginTop: 10 }}>
                <b>Legal disclaimer:</b> This will only slow down people from accessing your work. MYR is not sutiable for sensitive information.
            </p>
        </div>
    );

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
                variant="raised"
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

    qrCodeOpen = () => {
        return (
            <div>
                <h5>QR Code to Your Project</h5>
                <QRCode size={330} value={window.location.href} />
            </div>
        );
    };

    // Toggles the grid on and off
    toggleGrid = () => {
        this.props.sceneActions.toggleCoordSky();
    };

    handleSkyChangeComplete = (color) => {
        this.setState({ skyColor: color.hex });
        this.props.sceneActions.changeSkyColor(color.hex);
    };

    handleFloorChangeComplete = (color) => {
        this.setState({ floorColor: color.hex });
        this.props.sceneActions.changeFloorColor(color.hex);
    };

    handleSkyColorClick = () => {
        this.setState({ displaySkyColorPicker: !this.state.displaySkyColorPicker });
    };

    handleFloorColorClick = () => {
        this.setState({ displayFloorColorPicker: !this.state.displayFloorColorPicker });
    };

    handleSkyColorClose = () => {
        this.setState({ displaySkyColorPicker: false });
    };

    handleFloorColorClose = () => {
        this.setState({ displayFloorColorPicker: false });
    };

    // Toggles whether the editor is showing
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

    // Toggles the ability to fly in the scene
    flyToggle = () => {
        let style = this.props.scene.settings.canFly ? btnStyle.on : btnStyle.off;
        style = { ...btnStyle.base, ...style };
        return (
            <ButtonBase
                style={style}
                onClick={() => this.props.sceneActions.toggleFly()} >
                {
                    this.props.scene.settings.canFly
                        ? <Icon className="material-icons">toggle_on</Icon>
                        : <Icon className="material-icons">toggle_off</Icon>
                }
                Flying
            </ButtonBase >
        );
    };

    // Toggles the grid on and off
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

    // Toggles the floor on and off
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

    handleAddClassToggle = () => {
        this.setState({ addClassOpen: !this.state.addClassOpen });
    };

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

    addClass = () => (
        <div>
            <h5>Please enter your collection name.</h5>
            {this.props.scene && this.props.scene.settings.collectionID ? <p>{"Current collection: " + this.props.scene.settings.collectionID}</p> : null}
            <TextField
                id="standard-name"
                type="text"
                onChange={this.handleTextChange("collectionID")}
            />
            <Button
                color="primary"
                onClick={() => {
                    this.handleAddClassToggle();
                    this.props.sceneActions.addcollectionID(this.state.collectionID.toLowerCase());
                    this.props.handleSave();
                    this.props.handleSaveClose();
                }} >
                Save
            </Button>
        </div>
    );



    // Resets the camera, but also applies a small random num to make it reset
    // See reducer for more info
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

    handleChange = (event, value) => {
        this.setState({ value });
    };

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
                                    padding: 0,
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
                                    fullWidth={false}
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
                                            <div className="col-12 border-bottom pt-4">Camera Control</div>
                                            <div className="col-6">
                                                <this.flyToggle />
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
                                                    <ChromePicker disableAlpha={true} color={this.state.skyColor} onChangeComplete={this.handleSkyChangeComplete} />
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
                                                    <ChromePicker disableAlpha={true} color={this.state.floorColor} onChangeComplete={this.handleFloorChangeComplete} />
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
                                                {/* <ButtonBase
                                                    style={btnStyle.base}
                                                    onClick={() => { this.handlePwToggle(); }} >
                                                    <Icon className="material-icons">lock</Icon>
                                                    Add PW
                                                </ButtonBase> */}
                                            </div>
                                            <div className="col-12 border-bottom pt-4">Collection Control</div>
                                            <div className="col-6">
                                                <this.addCollectionToggle />
                                            </div>
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
                            open={this.state.pwProtectOpen}
                            onClose={this.handlePwToggle} >
                            <div style={getModalStyle()} className={classes.paper}>
                                <ButtonBase
                                    style={{ position: "absolute", right: 15, top: 15 }}
                                    onClick={() => this.handlePwToggle()} >
                                    <Icon className="material-icons">clear</Icon>
                                </ButtonBase >
                                <this.pwProtect />
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
