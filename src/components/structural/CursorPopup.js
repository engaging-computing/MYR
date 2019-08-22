import React, {Component} from 'react';
import {
        Icon, 
        IconButton,
        Popover,
        Divider
    } from '@material-ui/core/';
import Myr from "../../myr/Myr.js";

import "../../css/CursorState.css"

let m = new Myr();
m.init();


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

    /*
     * 1. If texts contains a function but no call, remove that text from what will be processed
     * 2. If the text contains a function call but no definition, scan the rest of the text for the body
     * 3. Implement stepper for loops
     * 4. Should display state at beginning and end of functions / loops
    */

    parseOutFunc(fullText) {
        let newText;



        return newText;
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
                let text = "resetCursor();\n" + (editor.getSession().doc.$lines.slice(0,selectionRange).join("\n"));
                console.log(text);
                m.reset();
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

    getIconType = key => {
        switch (key) {
            case "position": return "my_location";
            case "scale": return "zoom_out_map";
            case "rotation": return "sync";
            case "magnitude": return "transform";

            default: return "help";
        }
    }


    helper = (key, value, firstPass) => {
        const shouldRenderObjects = typeof value === 'object' && value !== null && !firstPass; 
        const shouldRenderOther = (typeof value !== 'object' && firstPass) || (typeof value === 'object' && !firstPass);
        if(shouldRenderObjects) {
            //This maps out all of the key/value pairs in an object
            let str = Object.keys(value).map(k => {
                return this.helper(k, value[k], (Boolean(typeof value[k] !== "object")));
            })

            const iconType = this.getIconType(key);

            const shouldDisplayStyle = { "display": this.getOpen(key) }

            return (
                <div  className = "col-sm">
                    <div className = "iconContainer">
                        <IconButton
                            onClick={ () => this.handleButtonClick(key) }
                            variant="raised"
                            color="primary">
                            <Icon className="material-icons">{iconType}</Icon>
                        </IconButton>
                    </div>

                    <div id = "objectContainer">
                        <div style = {shouldDisplayStyle}>
                            <h6>{this.capitalize(key)}</h6>
                            <p>{str}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            if(shouldRenderOther)
                return (
                    <div className = "row">
                        <div className = "col-6">
                            <p className = "keyPara"> {this.capitalize(key)}</p>
                        </div> 
                        <div className = "col-6">
                            <p className = "valuePara"> {this.capitalize(value) + ""}</p>
                        </div> 
                    </div>        
                );
        }
    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    capitalize = word => {
        try {
            if(typeof word === "boolean") {
                return word ? "True" : "False"
            }
            return word.toString().charAt(0).toUpperCase() + word.slice(1);
        }
        catch(e) {
            return word;
        }
    }

    render() {
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
                            <>
                                <Divider variant="middle" />
                                <div className = "row">
                                    {
                                        Object.keys(this.state.obj).map(key => {
                                            return this.helper(key, this.state.obj[key], false);
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>

                </Popover>
            </div>
          );
    }
}

export default CursorPopup;