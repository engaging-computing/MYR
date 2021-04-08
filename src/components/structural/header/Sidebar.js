import React, { Component } from "react";
import { Drawer, Button, Icon, IconButton } from "@material-ui/core";

/**
 * The side bar provides a drawer with options to make changes to the scene.
 */
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    githubSvg =
        <svg width="35" height="35" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3">
            </path>
        </svg>

    github = (
        <a
            tabIndex="0"
            style={{ maxHeight: 30 }}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            href="https://github.com/engaging-computing/MYR"
            aria-labelledby="appbar-github"
            aria-describedby="appbar-github">
            {this.githubSvg}
        </a>
    )

    /**
     * handles the opening and closing of the sidebar
     */
    handleToggle = () => this.setState({ open: !this.state.open });

    /**
     * Adds the sidebar and child comonents to the sidebar and then adds it to the DOM
     */
    render() {
        const exitBtnStyle = {
            position: "absolute",
            top: 0,
            right: 0,
        };

        return (
            <div>
                <Button
                    aria-label="Menu"
                    size="small"
                    style={{ color: "#fff", marginTop: 8, marginLeft:-10, padding: 0}}
                    onClick={this.handleToggle}>
                    <Icon style={{ fontSize: 32 }}>menu</Icon>
                </Button>
                <Drawer
                    className="side-drawer"
                    style={{ zIndex: 1000 }}
                    open={this.state.open}
                    anchor="left"
                    onClick={this.handleToggle}
                    onClose={this.handleToggle} >
                    <IconButton
                        variant="contained"
                        color="default"
                        style={exitBtnStyle}
                        onClick={this.handleToggle}>
                        <Icon className="material-icons">close</Icon>
                    </IconButton>
                    <h1>MYR - {this.github}</h1>
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
