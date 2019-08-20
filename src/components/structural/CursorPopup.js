import React, {Component} from 'react';
import Popover from '@material-ui/core/Popover';


class CursorPopup extends Component {
    constructor() {
        super();

        this.state = {   
            anchorEl: null,
            obj: {},
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

    helper = (key, value) => {
        const style = {
            "padding" : "0px",
            "padding-left": "15px",
            "margin": "0px"
        }
        if(typeof value === 'object' && value !== null) {
            let str = Object.keys(value).map(k => {
                return this.helper(k, value[k]);
            })
            return (
                <div style={style}>
                    <h6>{key}</h6>
                    <p>{str}</p>
                </div>
            );
        } else {
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
                            Object.keys(this.state.obj).map(key => {
                                return this.helper(key, this.state.obj[key]);
                            })
                        }
                    </div>
                </Popover>
            </div>
          );
    }
}

export default CursorPopup;