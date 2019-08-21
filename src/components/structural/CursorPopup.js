import React, {Component} from 'react';
import {
        Icon, 
        IconButton,
        Popover,
    } from '@material-ui/core/';


class CursorPopup extends Component {
    constructor() {
        super();

        this.state = {   
            anchorEl: null,
            obj: {},
            posOpen: false,
            scaleOpen: false,
            rotOpen: false,
            magOpen: false
        }
    }

    componentDidMount() {
        const self = this;

        document.body.onclick = function(e) {   //when the document body is clicked
            if (window.event) {
                e = window.event.srcElement;           //assign the element clicked to e (IE 6-8)
            }
            else {
                e = e.target;                   //assign the element clicked to e
            }
        
            if (e.className && e.className.indexOf('ace_gutter-cell') !== -1) {   
                const editor = window.ace.edit("ace-editor");

                let selectionRange = editor.getSelectionRange().end.row;
                let text = editor.getSession().doc.$lines.slice(0,selectionRange).join("\n");
            
                // eslint-disable-next-line
                let func = Function(`'use strict'; ${text + "return getCursor();"}`);
                let cursorState = func();   
                
                console.table(cursorState);

                self.setState({
                    anchorEl: e,
                    obj: cursorState
                });
            }
        }

    }

    handleButtonClick = key => {
        console.log("clicked")
        switch (key) {
            case "position":
                this.setState({
                    posOpen: !this.state.posOpen
                })
                break;
            case "scale":
                this.setState({
                    scaleOpen: !this.state.scaleOpen
                })
                break;
            case "rotation":
                this.setState({
                    rotOpen: !this.state.rotOpen
                })
                break;
            case "magnitude":
                this.setState({
                    magOpen: !this.state.magOpen
                })
                break;
            default:
                break;
        }
    }

    getOpen = key => {
        switch (key) {
            case "position":
                return this.state.posOpen ? "block" : "none"
            case "scale":
                return this.state.scaleOpen ? "block" : "none"
            case "rotation":
                    return this.state.rotOpen ? "block" : "none"
            case "magnitude":
                    return this.state.magOpen ? "block" : "none"
            default:
                break;
        }
    }

    helper = (key, value, firstPass) => {
        const style = {
            "padding" : "0px",
            "paddingLeft": "15px",
            "margin": "0px",
            "display": "inline-block"
        }

        if(typeof value === 'object' && value !== null && !firstPass) {
            let str = Object.keys(value).map(k => {
                return this.helper(k, value[k], (Boolean(typeof value[k] !== "object")));
            })

  
            let iconType = "";

            switch (key) {
                case "position":
                    iconType = "my_location";
                    break;
                case "scale":
                    iconType = "zoom_out_map";
                    break;
                case "rotation":
                    iconType = "sync";
                    break;
                case "magnitude":
                    iconType = "transform";
                    break;
                default:
                    iconType = "help";
                    break;
            }

            const shouldDisplayStyle = {
                "display": this.getOpen(key)
            }

            console.log(shouldDisplayStyle)

            return (
                <div id = "objectContainer" style={style}>
                    <IconButton
                        onClick={() => {
                                this.handleButtonClick(key)
                            }
                        }
                        variant="raised"
                        color="primary">
                        <Icon className="material-icons">{iconType}</Icon>
                    </IconButton>
                    
                    <div style = {shouldDisplayStyle}>
                        <h6>{key}</h6>
                        <p>{str}</p>
                    </div>
                </div>
            );
        } else {
            if((typeof value !== 'object' && firstPass) || (typeof value === 'object' && !firstPass))
                return (
                    <div >
                        <p> {key + ": " + value} </p>
                    </div>        
                );
        }
    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    render() {
        const editorWidth = window.ace.edit("ace-editor").container.offsetWidth / 2;
        console.log(editorWidth);  
        return (
            <div>
                <Popover
                    id={this.state.open ? "cursor_popover" : undefined}
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={document.getElementById("scene")}
                    onClose={this.handleClose.bind(this)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }} >
                    <div>
                        <h3>Cursor Properties</h3>
                        {
                            //Renders all non objects first
                            Object.keys(this.state.obj).map(key => {
                                return this.helper(key, this.state.obj[key], true);
                            })
                        }
                        {
                            //Renders objects in a second sweep
                            Object.keys(this.state.obj).map(key => {
                                return this.helper(key, this.state.obj[key], false);
                            })
                        }
                    </div>
                </Popover>
            </div>
          );
    }
}

export default CursorPopup;