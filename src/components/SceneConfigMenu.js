import React, { Component } from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  Icon,
  Modal,
  TextField
} from "@material-ui/core";

import QRCode from "qrcode.react";

import { withStyles } from "@material-ui/core/styles";

// FUNC to position modal in the middle of the screen
function getModalStyle() {
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
  button: {
    margin: theme.spacing.unit,
  }
});

// CSS for buttons
const btnStyle = {
  base: {
    marginTop: 20,
    justifyContent: "right",
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
      skyColor: this.props.scene.color,
      anchorEl: null,
      qrCodeOpen: false,
      pwProtectOpen: false,
      shareOpen: false,
      email: "",
      sendTo: []
    }
  }

  // Opens the modal
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Closes the modal
  handleClose = () => {
    this.setState({ open: false });
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
    this.setState({ sendTo: arr, email: "" });
  }

  handleQrToggle = () => {
    this.setState({ qrCodeOpen: !this.state.qrCodeOpen });
  }

  handlePwToggle = () => {
    this.setState({ pwProtectOpen: !this.state.pwProtectOpen });
  }

  handleShrToggle = () => {
    this.setState({ shareOpen: !this.state.shareOpen });
  }

  pwProtect = () => (
    <div>
      <h5>Please enter a PW.</h5>
      <TextField
        id="standard-name"
        type="password"
        onChange={this.handleTextChange('pw')}
      />
      <Button
        color="primary"
        onClick={this.handlePwToggle} >
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
        onChange={this.handleTextChange('email')}
      />
      <IconButton
        variant="raised"
        onClick={this.handleAddEmail}
        color="primary">
        <Icon className="material-icons">add</Icon>
      </IconButton>
      <Button
        color="primary"
        href={`mailto:${this.state.sendTo.join(", ")}?subject=Check out my VR Scene in MYR&body=You can find my scene at ${window.location.href}`}>
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
  }

  // Handles local changes to the text input
  handleSceneColorChange = (event) => {
    this.setState({ skyColor: event.target.value });
  }

  // Sends sky color to the reducer
  submitColor = (event) => {
    event.preventDefault();
    this.props.sceneActions.changeSkyColor(this.state.skyColor);
    this.setState({ skyColor: null });
  }

  // Toggles whether the editor is showing
  viewToggle = () => {
    let style = this.props.scene.viewOnly ? btnStyle.off : btnStyle.on;
    style = { ...btnStyle.base, ...style };
    return (
      <ButtonBase
        style={style}
        onClick={() => this.props.sceneActions.changeView()} >
        {
          !this.props.scene.viewOnly
            ? <Icon className="material-icons">toggle_on</Icon>
            : <Icon className="material-icons">toggle_off</Icon>
        }
        Show Editor
      </ButtonBase >
    );
  }

  // Toggles the ability to fly in the scene
  flyToggle = () => {
    let style = this.props.scene.canFly ? btnStyle.on : btnStyle.off;
    style = { ...btnStyle.base, ...style };
    return (
      <ButtonBase
        style={style}
        onClick={() => this.props.sceneActions.toggleFly()} >
        {
          this.props.scene.canFly
            ? <Icon className="material-icons">toggle_on</Icon>
            : <Icon className="material-icons">toggle_off</Icon>
        }
        Flying
      </ButtonBase >
    );
  }

  // Toggles the grid on and off
  gridToggle = () => {
    let style = this.props.scene.showCoordHelper ? btnStyle.on : btnStyle.off;
    style = { ...btnStyle.base, ...style };
    return (
      <ButtonBase
        style={style}
        onClick={() => this.props.sceneActions.toggleCoordSky()} >
        {
          this.props.scene.showCoordHelper
            ? <Icon className="material-icons">toggle_on</Icon>
            : <Icon className="material-icons">toggle_off</Icon>
        }
        Show Grid
      </ButtonBase >
    );
  }

  // Toggles the floor on and off
  floorToggle = () => {
    let style = this.props.scene.showFloor ? btnStyle.on : btnStyle.off;
    style = { ...btnStyle.base, ...style };
    return (
      <ButtonBase
        style={style}
        onClick={() => this.props.sceneActions.toggleFloor()} >
        {
          this.props.scene.showFloor
            ? <Icon className="material-icons">toggle_on</Icon>
            : <Icon className="material-icons">toggle_off</Icon>
        }
        Show Floor
      </ButtonBase >
    );
  }

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
  }

  // Render all of the elements
  render() {
    const { classes } = this.props;
    return (
      <div>
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
            <div className="row d-flex">
              <div className="col-12 border-bottom">View Control</div>
              <div className="col-6">
                <this.viewToggle />
                <this.floorToggle />
              </div>
              <div className="col-6">
                <this.gridToggle />
                <TextField id="name-helper"
                  value={this.state.skyColor || ""}
                  label="Sky Color"
                  onSubmit={this.submitColor}
                  onBlur={this.submitColor}
                  onChange={this.handleSceneColorChange} />
              </div>
              <div className="col-6">
              </div>
              <div className="col-12 border-bottom pt-4">Camera Control</div>
              <div className="col-6">
                <this.flyToggle />
              </div>
              <div className="col-6">
                <this.resetPosition />
              </div>
              <div className="col-12 border-bottom pt-4">Privacy Control</div>
              <div className="col-6">
                <ButtonBase
                  style={btnStyle.base}
                  onClick={() => { this.handleQrToggle(); }} >
                  <Icon className="material-icons">gradient</Icon>
                  QR Code
                  </ButtonBase>
                <ButtonBase
                  style={btnStyle.base}
                  onClick={() => { this.handleShrToggle(); }} >
                  <Icon className="material-icons">send</Icon>
                  Send To
                  </ButtonBase>
              </div>
              <div className="col-6">
                <ButtonBase
                  style={btnStyle.base}
                  onClick={() => { this.handlePwToggle(); }} >
                  <Icon className="material-icons">lock</Icon>
                  Add PW
                  </ButtonBase>
              </div>
              <div className="col-12 border-bottom mt-3"></div>
              <div className="offset-4 col-4">
                <ButtonBase
                  style={btnStyle.save}
                  onClick={() => this.handleClose()} >
                  Close
                </ButtonBase >
              </div>
              {/* This is for the dual button config
              <div className="col-6">
                <ButtonBase
                  style={btnStyle.cancel}
                  onClick={() => this.handleClose()} >
                  Cancel
                </ButtonBase >
              </div> */}
            </div>
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
      </div >
    );
  }
}

const SceneConfigMenu = withStyles(modelStyles)(ConfigModal);

export default SceneConfigMenu;
