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
        shortcut: ["Ctrl/Cmd", "S"],
        description: "Save a scene"
    },
    {
        shortcut: ["Ctrl/Cmd", "Shift", "S"],
        description: "Pop up a save tab"
    },
    {
        shortcut: ["Ctrl/Cmd", "Enter"],
        description: "Render a scene"
    },
];

const editor = [
    {
        shortcut: ["Ctrl/Cmd", "/"],
        description: "Comment current or selected line of code"
    },
    {
        shortcut: ["Alt/Option", "Up"],
        description: "Move a code up"
    },
    {
        shortcut: ["Alt/Option", "Down"],
        description: "Move a code down"
    },
    {
        shortcut: ["Alt/Cmd", "D"],
        description: "Delete a line of code"
    }
];

const scene = [
    {
        shortcut: ["W"],
        description: "Move forward"
    },
    {
        shortcut: ["A"],
        description: "Slide left"
    },
    {
        shortcut: ["S"],
        description: "Move backward"
    },
    {
        shortcut: ["D"],
        description: "Slide right"
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

class KeyboardShortcut extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        };
    }

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

    handleClick = (event) =>{
        this.setState({
            open: true,
            anchorEl: event.target});
    };

    handleClose = () => {
        this.setState({
            open: false,
            anchorEl: null});
    };

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
                            <p className="title">General Command</p>
                            {
                                general.map(e => {return this.shortcutHelper(e);})
                            }
                        </section>
                        <section className="right">
                            <p className="title">Editor Command</p>
                            {
                                editor.map(e => {return this.shortcutHelper(e);})
                            }
                        </section>
                        <section className="right">
                            <p className="title">Scene Command</p>
                            {
                                scene.map(e => {return this.shortcutHelper(e);})
                            }
                        </section>
                    </div>
                </Popover> 
            </div>
        );
    }
}

export default KeyboardShortcut;