import React, { Component } from "react";
import {
  ButtonBase,
  IconButton,
  Icon,
  Modal,
  TextField
} from "@material-ui/core";

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
      skyColor: this.props.scene.color
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
        onClick={() => !this.props.sceneActions.changeView()} >
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
          onClose={this.handleClose}
        >
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
              <div className="col-12 border-bottom pt-4">Movement Control</div>
              <div className="col-6">
                <this.flyToggle />
              </div>
              <div className="col-6">
                <this.resetPosition />
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
        </Modal>
      </div >
    );
  }
}

const SceneConfigMenu = withStyles(modelStyles)(ConfigModal);

export default SceneConfigMenu;
