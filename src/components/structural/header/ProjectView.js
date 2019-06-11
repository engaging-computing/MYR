import React from 'react';
import QRCode from 'qrcode.react';
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
  TextField
} from '@material-ui/core';

import { withStyles } from "@material-ui/core/styles";
import "../../../css/ProjectView.css";

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
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  info: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
  }
});
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
      sendTo: []
    };
    this.emailRef = React.createRef();
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

  // pwProtect = () => (
  //   <div>
  //     <h5>Please enter a PW.</h5>
  //     <TextField
  //       type="password"
  //       label="Password"
  //       value={this.state.pw}
  //       onChange={this.handleTextChange('pw')}
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
        onChange={this.handleTextChange('email')}
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
        href={`mailto:${this.state.sendTo.join("; ")}?subject=Check out my VR Scene in MYR&body=You can find my scene at ${window.origin + '/' + this.state.projectId}`}>
        Send
      </Button>
    </div>
  );

  infoOpen = () => {
    let projectId = this.state.projectId;
    let project;
    if (this.state.isUserProj) {
      project = this.props.userProjs.find(function (project) {
        return project.id === projectId;
      });
    }
    else {
      project = this.props.examplProjs.find(function (project) {
        return project.id === projectId;
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
    let lastMod = new Date(project.data.ts);
    return (
      <div>
        <h3>{project.name}</h3>
        <p id="info-description">{project.data.desc}</p>
        <small>Last Modified: {lastMod.toDateString()}</small>
      </div>
    );
  };

  qrCodeOpen = () => {
    return (
      <div>
        <h5>QR Code to Your Project</h5>
        <QRCode size={330} value={window.origin + '/' + this.state.projectId} />
      </div>
    );
  };

  helper = (proj, canDelete) => {
    if (proj) {
      let id = proj.id;
      let name = proj.data.name;
      return (
        <div key={id} id={id} title={name}
          className="proj col-xs-12 col-md-6 col-lg-4 pt-2 pl-0" >
          <a href={`/${id}`} >
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
                onClick={() => this.props.deleteFunc(id, proj.data.name)}>
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
      {/* <MenuItem
        onClick={() => { this.handleClose(); this.handlePwToggle(); }}>
        <ListItemIcon >
          <Icon className="material-icons">lock</Icon>
        </ListItemIcon>
        <ListItemText inset primary="PW Protect" />
      </MenuItem> */}
    </Menu>
  );

  render() {
    const { classes } = this.props;
    let previewToggle = {
      position: 'fixed ',
      top: 0,
      right: "46%"
    };
    const userProjs = [].concat(this.props.userProjs);
    const examplProjs = [].concat(this.props.examplProjs);
    return (
      <div id="project-list" >
        <div className="row" id="user-proj" style={{ width: "100%" }}>
          <h3 className="col-12 p-0 mb-3 border-bottom"> Your Projects </h3>
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
          { // Sort the users projects in alphabetical order
            userProjs.sort(function (a, b) {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }).map(proj => {
              return this.helper(proj, true);
            })
          }
        </div>
        <div className="row" id="sample-proj" style={{ width: "100%" }}>
          <h3 className="col-12 p-2 mb-3 border-bottom">Sample Projects</h3>
          <hr />
          { // Sort the examples projects in alphabetical order
            examplProjs.sort(function (a, b) {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }).map(proj => {
              return this.helper(proj, false);
            })
          }
        </div>
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
    );
  }
}

const ProjectView = withStyles(modelStyles)(Project);

export default ProjectView;
