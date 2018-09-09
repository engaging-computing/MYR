import React, { Component } from 'react';
import {
  Icon,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

class SceneConfig extends Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.scene.viewOnly
            ?
            <MenuItem onClick={() => this.props.sceneActions.changeView()} >
              <ListItemIcon>
                <Icon className="material-icons">code</Icon>
              </ListItemIcon>
              <ListItemText inset primary="Edit" />
            </MenuItem>
            :
            <MenuItem onClick={() => this.props.sceneActions.changeView()} >
              <ListItemIcon>
                <Icon className="material-icons">visibility</Icon>
              </ListItemIcon>
              <ListItemText inset primary="View" />
            </MenuItem>
        }
        <MenuItem onClick={() => this.props.sceneActions.toggleCoordSky()} >
          <ListItemIcon>
            <Icon className="material-icons">grid_on</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Grid" />
        </MenuItem>
        <MenuItem onClick={() => this.props.sceneActions.setCamera(0, 1.6, 3)} >
          <ListItemIcon>
            <Icon className="material-icons">switch_camera</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Origin" />
        </MenuItem>
        <MenuItem onClick={() => this.props.sceneActions.setCamera(0, 8, 3)} >
          <ListItemIcon>
            <Icon className="material-icons">switch_camera</Icon>
          </ListItemIcon>
          <ListItemText inset primary="High" />
        </MenuItem>
        <MenuItem onClick={() => this.props.sceneActions.setCamera(15, 4.6, 15)} >
          <ListItemIcon>
            <Icon className="material-icons">switch_camera</Icon>
          </ListItemIcon>
          <ListItemText inset primary="Iso" />
        </MenuItem>
        {
          this.props.scene.showFlyHelper
            ?
            <MenuItem onClick={() => this.props.sceneActions.toggleFly()} >
              <ListItemIcon>
                <Icon className="material-icons">clear</Icon>
              </ListItemIcon>
              <ListItemText inset primary="Disable Fly" />
            </MenuItem>
            :
            <MenuItem onClick={() => this.props.sceneActions.toggleFly()} >
              <ListItemIcon>
                <Icon className="material-icons">arrow_upward</Icon>
              </ListItemIcon>
              <ListItemText inset primary="Enable Fly" />
            </MenuItem>
        }



      </ React.Fragment >
    );
  }
}

export default SceneConfig;
