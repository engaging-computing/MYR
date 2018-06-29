import React, { Component } from 'react';
import {
  Button,
  Icon
} from '@material-ui/core';

class SceneConfig extends Component {
  render() {
    return (
      <React.Fragment>
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
          onClick={() => this.props.sceneActions.setCamera(0, 1.6, 0)}
          className="sidebar-btn" >
          <Icon className="material-icons">switch_camera</Icon>
          Origin
        </Button>
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.props.sceneActions.setCamera(0, 8, 0)}
          className="sidebar-btn" >
          <Icon className="material-icons">switch_camera</Icon>
          High
        </Button>
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.props.sceneActions.setCamera(-15, 1.6, -15)}
          className="sidebar-btn" >
          <Icon className="material-icons">switch_camera</Icon>
          Iso
        </Button>
      </ React.Fragment>
    );
  }
}

export default SceneConfig;