import React, { Component } from 'react';
import { Drawer, Button, Icon, IconButton } from '@material-ui/core';


/**
* @summary - The side bar provides a drawer with options to make changes to the scene.
*/
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  /**
  * @summary - handles the opening and closing of the sidebar
  */
  handleToggle = () => this.setState({ open: !this.state.open });

  /**
  * @summary - Adds the sidebar and child comonents to the sidebar and then adds it to the DOM
  */
  render() {
    const exitBtnStyle = {
      position: "fixed",
      top: 0,
      right: 0,
    };

    return (
      <div>
        <Button
          aria-label="Menu"
          size="small"
          style={{ color: "#fff", paddingLeft: 0}}
          onClick={this.handleToggle}>
          <Icon style={{ fontSize: 32 }}>menu</Icon>
        </Button>
        <Drawer
          className="side-drawer"
          style={{zIndex: 1000}}
          open={this.state.open}
          anchor="left"
          onClick={this.handleToggle}
          onClose={this.handleToggle} >
          <IconButton variant="raised"
            color="default"
            style={exitBtnStyle}
            onClick={this.handleToggle}>
            <Icon className="material-icons">close</Icon>
          </IconButton>
          {React.Children.map(this.props.children, child => {
            return (
              child
            );
          })}
        </Drawer>
      </div>
    );
  }
}

export default Sidebar;