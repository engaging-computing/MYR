import React from "react";
import {
    Button,
    ButtonBase,
    Icon,
    Tooltip,
    Popover,
} from "@material-ui/core";
import "../../css/KeyboardShortcut.css";

const general = [
    {
        shortcut: ["Ctrl/⌘", "S"],
        description: "Save scene"
    },
    {
        shortcut: ["Ctrl/⌘", "Shift", "S"],
        description: "Save scene as"
    },
    {
        shortcut: ["Ctrl/⌘", "Enter"],
        description: "Render scene"
    },
];

const editor = [
    {
        shortcut: ["Ctrl/⌘", "/"],
        description: "Comment current or selected line of code"
    },
    {
        shortcut: ["Alt/Option", "Up"],
        description: "Move current line of code up 1 line"
    },
    {
        shortcut: ["Alt/Option", "Down"],
        description: "Move current line of code down 1 line"
    },
    {
        shortcut: ["Alt/⌘", "D"],
        description: "Delete current line of code"
    }
];

const scene = [
    {
        shortcut: ["W"],
        description: "Move forwards"
    },
    {
        shortcut: ["S"],
        description: "Move backwards"
    },
    {
        shortcut: ["A"],
        description: "Move left"
    },
    {
        shortcut: ["D"],
        description: "Move right"
    },
    {
        shortcut: ["Space"],
        description: "Move up"
    },
    {
        shortcut: ["Shift"],
        description: "Move down"
    },
];

/**
 * React components create the button with KeyboardShortcut window
 */
class KeyboardShortcut extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        };
    }

    /**
     * Helper function to convert the shrotcuts to an equivalent DOM elements 
     * 
     * @param {array} data 
     */
    shortcutHelper = (data) => {
        let shortcuts = [];
        data.shortcut.forEach((key,i)=>{
            shortcuts.push(<kbd>{key}</kbd>);
            if(i < data.shortcut.length-1){
                shortcuts.push(" + ");
            }
        });
        return (<p>{shortcuts} {data.description}</p>);
    };

    /**
     * Update the state when the button is clicked
     * 
     * @param {object} event target to anchor the window
     */
    handleClick = (event) =>{
        this.setState({
            open: true,
            anchorEl: event.target});
    };

    /**
     * Update the state when the window is closed
     * 
     * @param {object} event target to anchor the window
     */
    handleClose = () => {
        this.setState({
            open: false,
            anchorEl: null});
    };

    /**
     * Creates the keyboard shortcut in the DOM
     */
    render(){
        return(
            <div>
                <Tooltip title="Keyboard Shortcut">
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={this.handleClick}>
                        <Icon className="material-icons">keyboard</Icon>
                    </Button>
                </Tooltip>
                <Popover
                    id="simple-popover"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical:"top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "bottom",
                        hotizontal: "left"
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className="keyboard-shortcut">
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={this.handleClose} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <section className="right">
                            <p className="title">General Commands</p>
                            {
                                general.map(e => {return this.shortcutHelper(e);})
                            }
                        </section>
                        <section className="right">
                            <p className="title">Editor Commands</p>
                            {
                                editor.map(e => {return this.shortcutHelper(e);})
                            }
                        </section>
                        <section className="right">
                            <p className="title">Scene Controls</p>
                            {
                                scene.map(e => {return this.shortcutHelper(e);})
                            }
                        </section>
                    </div>
                    <p className="note">⌘: Command key for macOS user</p>
                </Popover> 
            </div>
        );
    }
}

export default KeyboardShortcut;