import React, { Component } from "react";
import Popover from "@material-ui/core/Popover";

class CursorPopup extends Component {
    constructor() {
        super();

        this.state = {      
            text: null,  
            anchorEl: null,
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
                let str = "";

                const props = Object.keys(cursorState);
                for(const prop of props) {
                    if(prop){
                        str += (prop + ": " + cursorState[prop] + ", ");
                    }
                }

                console.log(str);

                self.setState({
                    anchorEl: e,
                    text: str
                });
            }
        }

    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    render() {
        return (
            <div>
                <Popover
                    id={this.state.open ? "simple-popover" : undefined}
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.stateanchorEl}
                    onClose={this.handleClose.bind(this)}
                    anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                    }}
                    transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                    }} >
                    <p>
                        {JSON.stringify(this.state.text)}
                    </p>
                </Popover>
              
            </div>
          );
    }
}

export default CursorPopup;