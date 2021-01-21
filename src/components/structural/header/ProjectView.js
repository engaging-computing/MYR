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
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteFunc: this.props.deleteFunc,
            showImg: false,
            anchorEl: null,
            qrCodeOpen: false,
            pwProtectOpen: false,
            shareOpen: false,
            infoOpen: false,
            email: "",
            pw: "",
            sendTo: [],
            value: this.props.tab,
        };
        this.emailRef = React.createRef();
        this.inputFileRef = React.createRef();
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget, projectId: event.currentTarget.id });
    };

    handleInfoUserClick = event => {
        this.setState({ projectId: event.currentTarget.id, isUserProj: true });
        this.handleInfoToggle();
    };

    handleInfoExampleClick = event => {
        this.setState({ projectId: event.currentTarget.id, isUserProj: false });
        this.handleInfoToggle();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
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
    }

    handleInfoToggle = () => {
        this.setState({ infoOpen: !this.state.infoOpen });
    }

    handleQrToggle = () => {
        this.setState({ qrCodeOpen: !this.state.qrCodeOpen });
    }

    handlePwToggle = () => {
        this.setState({ pwProtectOpen: !this.state.pwProtectOpen });
    }

    handleShrToggle = () => {
        this.setState({ shareOpen: !this.state.shareOpen, sendTo: [] });
    }
    //handleProjectToggle = () => {
    //  this.setState({ projectsOpen: !this.state.projectsOpen });
    //  this.setState({ value: "a" });
    //};

    // pwProtect = () => (
    //   <div>
    //     <h5>Please enter a PW.</h5>
    //     <TextField
    //       type="password"
    //       label="Password"
    //       value={this.state.pw}
    //       onChange={this.handleTextChange("pw")}
    //       margin="normal"
    //     />
    //     <Button
    //       color="primary"
    //       onClick={this.handlePwToggle} >
    //       Save
    //     </Button>
    //     <p style={{ fontSize: "80%", marginTop: 10 }}>
    //       <b>Legal disclaimer:</b> This will only slow down people from accessing your work. MYR is not sutiable for sensitive information.
    //     </p>
    //   </div>
    // );

    // pwProtect = () => (
    //   <div>
    //     <h5>Please enter a PW.</h5>
    //     <TextField
    //       type="password"
    //       label="Password"
    //       value={this.state.pw}
    //       onChange={this.handleTextChange("pw")}
    //       margin="normal"
    //     />
    //     <Button
    //       color="primary"
    //       onClick={this.handlePwToggle} >
    //       Save
    //     </Button>
    //     <p style={{ fontSize: "80%", marginTop: 10 }}>
    //       <b>Legal disclaimer:</b> This will only slow down people from accessing your work. MYR is not sutiable for sensitive information.
    //     </p>
    //   </div>
    // );

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

    qrCodeOpen = () => {
        return (
            <div>
                <h5>QR Code to Your Project</h5>
                <QRCode size={330} value={window.origin + "/scene/" + this.state.projectId} />
            </div>
        );
    };

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
            <MenuItem
                onClick={() => {this.props.exportFunc(this.state.projectId);}}>
                <ListItemIcon>
                    <Icon className="material-icons">get_app</Icon>
                </ListItemIcon>
                <ListItemText inset primary="Export"/>
            </MenuItem>
            {/* <MenuItem
        onClick={() => { this.handleClose(); this.handlePwToggle(); }}>
        <ListItemIcon >
          <Icon className="material-icons">lock</Icon>
        </ListItemIcon>
        <ListItemText inset primary="PW Protect" />
      </MenuItem> */}
        </Menu>
    );

    handleChange = (event, value) => {
        this.setState({ value });
    };

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
                                    <div className="row" style={{width: "100%", flexDirection: "row-reverse"}}>
                                        <div>
                                            <Tooltip title="Export all Scenes, use the share button to export individual scenes">
                                                {/* This needs to be in arrow function to prevent a parameter from being passed*/}
                                                <Button onClick={() => { this.props.exportFunc();} }>
                                                    <Icon className="material-icons">get_app</Icon>
                                                    <span>&nbsp;</span>Export All
                                                </Button>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <form>
                                                <input type="file" name="import" ref={this.inputFileRef} style={{visibility: "hidden"}} onChange={this.props.importFunc} accept=".json" />
                                                {/*This needs to be in an arrow function since inputFileRef may not have created it's ref before ProjectView itself */}
                                                <Button onClick={() => { this.inputFileRef.current.click(); }}>
                                                    <Icon className="material-icons">publish</Icon>
                                                    <span>&nbsp;</span>Import
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
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
                        </div>
                    </Modal>
                </React.Fragment>
            </div>
        );
    }
}

const ProjectView = withStyles(modelStyles)(Project);

export default ProjectView;
