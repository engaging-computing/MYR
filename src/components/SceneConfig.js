import React, { Component } from 'react';
import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Tooltip,
  Drawer,
  IconButton,
  FormControl,
  TextField,
  Snackbar,
  Popover,
  Avatar
} from '@material-ui/core';

class SceneConfig extends Component {


  render() {
    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.props.sceneActions.toggleCoordSky()}
          className="sidebar-btn" >
          <Icon className="material-icons">grid_on</Icon>
          Toggle Scene Coordinate Helper
        </Button>
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.props.sceneActions.resetCamera()}
          className="sidebar-btn" >
          <Icon className="material-icons">grid_on</Icon>
          Toggle Scene Coordinate Helper
        </Button>
      </div>
    )
  }
}

export default SceneConfig;