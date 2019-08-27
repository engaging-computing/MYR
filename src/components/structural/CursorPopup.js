import React, {Component} from 'react';
import {
        Icon, 
        IconButton,
        Popover,
        Divider
    } from '@material-ui/core/';
import "../../css/CursorState.css";

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

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        const self = this;

        const getGutterClick = (e) => {  
            if (window.event) e = window.event.srcElement// (IE 6-8)
            else e = e.target;     
            
            if (e.className && e.className.indexOf('ace_gutter-cell') !== -1) { 
                let cursorState;               
                let selectionRange = window.ace.edit("ace-editor").getSelectionRange().start.row + 1;
                let text = this.parseFullTextIntoArray(selectionRange);
                
                if(!Array.isArray(text)) {
                    // eslint-disable-next-line
                    let func = Function(`'use strict'; ${text}`);
                    cursorState = func();

                    self.setState({
                        anchorEl: e,
                        obj: cursorState,
                        arr: null,
                        isArr: false,
                        index: 0,
                        maxIndex: 0
                    });
                } else {
                    self.setState({
                        anchorEl: e,
                        obj: text[0],
                        arr: text,
                        isArr: true,
                        index: 0,
                        maxIndex: text.length - 1
                    });
                }
                
            }
        }

        window.addEventListener("click", () => {
            try {
                getGutterClick();
            } catch (e) {
                console.error(e);
            }
        });
    }

    parseFullTextIntoArray(breakpoint) {
        let editorDoc = window.ace.edit("ace-editor").getSession().doc;

        let firstArr = editorDoc.$lines.slice(0, breakpoint);
        firstArr = this.removeComments(firstArr);

        let hasLoop = this.detectLoops(this.removeComments(editorDoc.$lines.slice(0, editorDoc.$lines.length)), breakpoint);
        
        if(hasLoop) {
            return hasLoop;
        }

        firstArr.unshift("resetCursor();"); //Resets cursor before running code
        firstArr.push("return getCursor();"); //Now will return the cursor value after the breakpoint

        let secondArr = editorDoc.$lines.slice(breakpoint, editorDoc.$lines.length);
        secondArr = this.removeComments(secondArr);

        const modifiedTextArr = firstArr.concat(secondArr);
        //Modified array will now store all code since there was a function

        return modifiedTextArr.join("\n");
    }

    detectLoops(textArr, breakpoint) {
        const counter = "anOverlyComplicatedVariableName";
        let start, end;
        for(let i = 0; i < textArr.length && i <= breakpoint; i ++) {
            if(textArr[i].indexOf("while(") !== -1 || textArr[i].indexOf("for(") !== -1 || textArr[i].indexOf("do {") !== -1) {

                for(let j = i; j < textArr.length; j ++) {
                    if(textArr[j].indexOf("}") !== -1 ) {
                        if(i + 1 <= breakpoint && breakpoint <= j + 1){
                            console.log("ending bracket found at" + (j + 1));
                            start = i;
                            end = j;
                            let loopBody = [];
                            for(let x = i + 1; x < j; x ++) {
                                loopBody.push(textArr[x]);
                            }
                            
                            textArr.unshift("resetCursor();");
                            start++;
                            end++;

                            let temp = [...textArr];

                            temp.splice(start, 0, `let ${counter} = 0;`);  //Creates array
                            temp.splice(start+2, 0, `${counter}++;`)    //Stores value at beginning of each loop iteration in it
                            temp.splice(end+3, 0, `return ${counter};`);  //All values get returned at end

                            let text = temp.join("\n")
                            
                            // eslint-disable-next-line
                            let func = Function(`'use strict'; ${text}`);
                            let numberOfIterations = func();
                            console.log("a")
                            textArr.splice(start);  //Loop body removed, along with any extra lines of text that were passed in 
                                                    // (which is necessary since the end of loop may be passed the breakpoint)

                            //If the user clicked in a loop, we have no parsed out the loop body and deteremined how
                            //many iterations we go through. This data will get passed to a stepper function that 
                            //Will run one iteration of the loop, appended to the previous code at a time
                            return this.stepper(numberOfIterations, loopBody, textArr);
                        } else break;
                    }
                }
            }
        }
        return null;
    }

    stepper(maxI, body, fullArr) {
        let stateArr = [];
        let i = 0;
        console.log(fullArr);
        while(i < maxI) {
            for(let j = 0; j < body.length; j ++) {
                fullArr.push(body[j]);
            }
            fullArr.push("return getCursor();");
            let text = fullArr.join("\n")
            fullArr.pop();

            // eslint-disable-next-line
            let func = Function(`'use strict'; ${text}`);
            stateArr.push(func());

            i ++;
        }
        return stateArr;
    }
    
    removeComments(textArr) {
        for(let i = 0; i < textArr.length; i ++) {
            let index = textArr[i].indexOf("/")
            if(index !== -1) {
                textArr[i] = textArr[i].slice(0, index);
            }
        }
        return textArr;
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
            case "left" :
                if(this.state.index !== 0)
                    this.setState({
                        obj: this.state.arr[this.state.index - 1],
                        index: this.state.index - 1
                    });
                break;
            case "right" :
                if(this.state.index !== this.state.maxIndex)
                    this.setState({
                        obj: this.state.arr[this.state.index + 1],
                        index: this.state.index + 1
                    });
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
                <div  className = "col-auto">
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
                            {str}
                        </div>
                    </div>
                </div>
            );
        } else {
            if(shouldRenderOther)
                return (
                    <div className = "row">
                        <div className = "col-8">
                            <p className = "keyPara"> {this.capitalize(key)}</p>
                        </div> 
                        <div className = "col-4">
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
                        {
                            this.state.isArr ?
                                <div className = "row">                                
                                    <div className = "col-3">
                                    <IconButton
                                        onClick={ () => this.handleButtonClick("left") }
                                        variant="raised"
                                        color="primary">
                                        <Icon className="material-icons">chevron_left</Icon>
                                    </IconButton>    
                                    </div>
                                        <div className = "col-6"><h3>Cursor State</h3></div>
                                    <div className = "col-3">
                                        <IconButton
                                            onClick={ () => this.handleButtonClick("right") }
                                            variant="raised"
                                            color="primary">
                                            <Icon className="material-icons">chevron_right</Icon>
                                        </IconButton>
                                    </div>
                                </div> 
                            : <h3>Cursor State</h3>
                        
                        }
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