import React from "react";
import QRCode from "qrcode.react";
import {
    Button,
    ButtonBase,
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    TextField,
    Tooltip,
    Tabs,
    Tab
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import "../../../css/ProjectView.css";


function getOuterModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        maxWidth: "90%",
        maxHeight: "90%"
    };
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function getInfoModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

// CSS for modal
const modelStyles = theme => ({
    outer: {
        position: "absolute",
        width: theme.spacing(150),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        overflow: "scroll"
    },
    paper: {
        position: "absolute",
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    info: {
        position: "absolute",
        width: theme.spacing(100),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    }
});

const exitBtnStyle = {
    position: "absolute",
    top: 0,
    right: 0,
};

/**
 * Create component with show 
 */
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteFunc: this.props.deleteFunc,
            showImg: false,
            anchorEl: null,
            qrCodeOpen: false,
            shareOpen: false,
            infoOpen: false,
            email: "",
            sendTo: [],
            value: this.props.tab,
        };
        this.emailRef = React.createRef();
    }

    /**
     * Handles when user click on the project
     * @param {*} event 
     */
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget, projectId: event.currentTarget.id });
    };

    /**
     * Handles when user clicks on the info in the user project
     * @param {*} event 
     */
    handleInfoUserClick = event => {
        this.setState({ projectId: event.currentTarget.id, isUserProj: true });
        this.handleInfoToggle();
    };

    /**
     * Handles when user clicks on the info in the example project
     * @param {*} event 
     */
    handleInfoExampleClick = event => {
        this.setState({ projectId: event.currentTarget.id, isUserProj: false });
        this.handleInfoToggle();
    };

    /**
     * Handles when the projectview is closed
     * @param {*} event 
     */
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    /**
     * Handles when the text change in the textfield
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
    }

    /**
     * Handles toggle the project info
     */
    handleInfoToggle = () => {
        this.setState({ infoOpen: !this.state.infoOpen });
    }

    /**
     * Handles toggle the qrcode menu
     */
    handleQrToggle = () => {
        this.setState({ qrCodeOpen: !this.state.qrCodeOpen });
    }

    /**
     * Handles toggle the share menu
     */
    handleShrToggle = () => {
        this.setState({ shareOpen: !this.state.shareOpen, sendTo: [] });
    }

    /**
     * @returns Email field where user enters addresses they want to share it with
     */
    shareOptions = () => (
        <div>
            <h5>Enter one or more email addresses</h5>
            {
                this.state.sendTo.map(x => {
                    return <p>{x}</p>;
                })
            }
            <TextField
                id="standard-name"
                label="Email"
                value={this.state.email}
                inputRef={this.emailRef}
                onChange={this.handleTextChange("email")}
                margin="normal"
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
                href={`mailto:${this.state.sendTo.join("; ")}?subject=Check out my VR Scene in MYR&body=You can find my scene at ${window.origin + "/scene/" + this.state.projectId}`}>
                Send
            </Button>
        </div>
    );

    /**
     * @returns Returns the info of the project if it exists
     */
    infoOpen = () => {
        let projectId = this.state.projectId;
        let project;
        if (this.state.isUserProj) {
            project = this.props.userProjs.find(function (project) {
                return project._id === projectId;
            });
        }
        else {
            project = this.props.exampleProjs.find(function (project) {
                return project._id === projectId;
            });
        }
        if (!project) {
            return (
                <div>
                    <h5>Project Information</h5>
                    <h6>Error: Unable to load project information</h6>
                </div>
            );
        }
        let lastMod = new Date(project.updateTime);
        return (
            <div>
                <h3>{project.name}</h3>
                <p id="info-description">{project.desc}</p>
                <small>Last Modified: {lastMod.toDateString()}</small>
            </div>
        );
    };

    /**
     * @returns QR Code of the link to the project
     */
    qrCodeOpen = () => {
        return (
            <div>
                <h5>QR Code to Your Project</h5>
                <QRCode size={330} value={window.origin + "/scene/" + this.state.projectId} />
            </div>
        );
    };
    
    /**
     * Helper for creating the project card
     * @param {object} proj Porject info
     * @param {boolean} canDelete whehter project can be deleted
     * @returns Elements of the project card
     */
    helper = (proj, canDelete) => {
        if (proj) {
            let id = proj._id;
            let name = proj.name;
            return (
                <div key={id} id={id} title={name}
                    className="proj col-xs-12 col-md-6 col-lg-4 pt-2 pl-0" >
                    <a href={`/scene/${id}`} >
                        <span className="project-span">{name}</span>
                        <img id={id} alt={id} src={proj.url}
                            className={"img-thumbnail " + (this.state.showImg && "d-none")} />
                    </a>
                    {canDelete ?
                        <span className="scene-btns">
                            <IconButton
                                id={id}
                                color="primary"
                                onClick={this.handleInfoUserClick}
                                className="" >
                                <Icon className="material-icons">info</Icon>
                            </IconButton>
                            <IconButton
                                id={id}
                                color="primary"
                                onClick={this.handleClick}
                                className="" >
                                <Icon className="material-icons">share</Icon>
                            </IconButton>
                            <IconButton
                                label="delete Project"
                                color="secondary"
                                fullwidth={String(!this.state.showImg)}
                                onClick={() => this.props.deleteFunc(this.props.user.uid, id, proj.name)}>
                                <Icon className="material-icons">delete</Icon>
                            </IconButton>
                        </span>
                        : <span className="scene-btns">
                            <IconButton
                                id={id}
                                color="primary"
                                onClick={this.handleInfoExampleClick}
                                className="" >
                                <Icon className="material-icons">info</Icon>
                            </IconButton>
                            <IconButton
                                id={id}
                                color="primary"
                                onClick={this.handleClick}
                                className="" >
                                <Icon className="material-icons">share</Icon>
                            </IconButton>
                        </span>
                    }
                </div>
            );
        } else {
            return null;
        }
    }

    /**
     * @returns Create a share menu for QR Code and email 
     */
    sceneMenu = () => (
        <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose} >
            <MenuItem
                onClick={() => { this.handleClose(); this.handleQrToggle(); }}>
                <ListItemIcon >
                    <Icon className="material-icons">gradient</Icon>
                </ListItemIcon>
                <ListItemText inset primary="QR Code" />
            </MenuItem>
            <MenuItem
                onClick={() => { this.handleClose(); this.handleShrToggle(); }}>
                <ListItemIcon >
                    <Icon className="material-icons">send</Icon>
                </ListItemIcon>
                <ListItemText inset primary="Send" />
            </MenuItem>
        </Menu>
    );

    /**
     * Handles the switch between user and example project tab
     * @param {*} event 
     * @param {string} value New tab string 
     */
    handleChange = (event, value) => {
        this.setState({ value });
    };

    /**
     * Create project view
     */
    render() {
        const { classes } = this.props;
        let previewToggle = {
            //paddingtop: 10,
            position: "fixed",
            top: 10,
            right: "46%",
        };
        const style = {
            default: {
                margin: 2,
                color: "#fff",
            }
        };
        const userProjs = [].concat(this.props.userProjs);
        const exampleProjs = [].concat(this.props.exampleProjs);
        return (
            <div>
                <React.Fragment>
                    {
                        !this.props.hideTooltip ?
                            <Tooltip title="Open" placement="bottom-start">
                                <IconButton
                                    id="open-btn"
                                    onClick={this.props.handleProjectToggle}
                                    className="header-btn"
                                    aria-haspopup="true"
                                    style={style.default}>
                                    <Icon className="material-icons">perm_media</Icon>
                                </IconButton>
                            </Tooltip>
                            : null
                    }
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.props.projectsOpen}
                        onClose={this.props.handleProjectToggle}>
                        <div style={getOuterModalStyle()} className={classes.outer}>
                            <IconButton
                                color="default"
                                style={exitBtnStyle}
                                onClick={this.props.handleProjectToggle}>
                                <Icon className="material-icons">close</Icon>
                            </IconButton>
                            <div>
                                <Button
                                    style={previewToggle}
                                    onClick={() => this.setState({ showImg: !this.state.showImg })}>
                                    { // If we are showing the img, show the proper icon
                                        this.state.showImg
                                            ?
                                            <Icon className="material-icons">visibility_off</Icon>
                                            :
                                            <Icon className="material-icons">visibility</Icon>
                                    }
                                    <span>&nbsp;</span>Preview
                                </Button>
                                <hr />
                            </div>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange} >
                                <Tab
                                    label="Your Projects"
                                    value="a" />
                                <Tab
                                    label="Example Scenes"
                                    value="b" />
                            </Tabs>
                            {this.state.value === "a" &&
                                <div id="project-list" style={{ marginTop: 0, overflow: "scroll" }}>
                                    <div className="row" id="user-proj" style={{ width: "100%" }}>
                                        { // Sort the users projects in alphabetical order
                                            userProjs.sort(function (a, b) {
                                                return a.name < b.name ? -1 : a.name > b.name ? 1 : a.updateTime > b.updateTime ? -1 : a.updateTime < b.updateTime ? 1 : 0;
                                            }).map(proj => {
                                                return this.helper(proj, true);
                                            })
                                        }
                                    </div>
                                </div>}
                            {this.state.value === "b" &&
                                <div id="project-list" style={{ marginTop: 0, overflow: "scroll" }}>
                                    <div className="row" id="sample-proj" style={{ width: "100%" }}>
                                        {
                                            exampleProjs.sort(function (a, b) {
                                                return a.name < b.name ? -1 : a.name > b.name ? 1 : a.updateTime > b.updateTime ? -1 : a.updateTime < b.updateTime ? 1 : 0;
                                            }).map(proj => {
                                                return this.helper(proj, false);
                                            })
                                        }
                                    </div>
                                </div>}
                            <this.sceneMenu />

                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.infoOpen}
                                onClose={this.handleInfoToggle} >
                                <div style={getInfoModalStyle()} className={classes.info}>
                                    <ButtonBase
                                        style={{ position: "absolute", right: 15, top: 15 }}
                                        onClick={() => this.handleInfoToggle()} >
                                        <Icon className="material-icons">clear</Icon>
                                    </ButtonBase >
                                    <this.infoOpen />
                                </div>
                            </Modal>
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
                        </div>
                    </Modal>
                </React.Fragment>
            </div>
        );
    }
}

const ProjectView = withStyles(modelStyles)(Project);

export default ProjectView;
