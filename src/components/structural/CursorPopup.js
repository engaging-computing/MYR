import React, {Component} from 'react';
import {
        Icon, 
        IconButton,
        Popover,
        Divider
    } from '@material-ui/core/';
import "../../css/CursorState.css";
import { throws } from 'assert';


/** TODO
 * 1. Decide on behavior for nested loops
 * 2. Triply nested loops do not behave
 * 3. Work on function cursor popup
 */

class CursorPopup extends Component {
    constructor() {
        super();

        this.state = {   
            anchorEl: null,
            obj: {},
            posOpen: false,
            scaleOpen: false,
            rotOpen: false,
            magOpen: false,
            isFunc: false
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
                
                //If we clicked on text not in a function or a loop
                if(!Array.isArray(text) && !this.state.isFunc) {
                    // eslint-disable-next-line
                    let func = Function(`'use strict'; ${text}`);
                    cursorState = func();

                    self.setState({
                        anchorEl: e,
                        obj: cursorState,
                        arr: null,
                        isArr: false,
                        index: 0,
                        maxIndex: 0,
                        isFunc: false
                    });
                //If we clicked on text in a function
                } else if(this.state.isFunc){
                    self.setState({
                        anchorEl: e,
                        obj: text,
                        arr: null,
                        isArr: false,
                        index: 0,
                        maxIndex: 0,
                        isFunc: true
                    });
                //If we clicked on text in a loop
                } else {
                    self.setState({
                        anchorEl: e,
                        obj: text[0],
                        arr: text,
                        isArr: true,
                        index: 0,
                        maxIndex: text.length - 1,
                        isFunc: false
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

        let isInFunctionBody = this.detectFunctionBody(this.removeComments(editorDoc.$lines.slice(0, editorDoc.$lines.length)), breakpoint);

        if(isInFunctionBody) {
            this.setState({
                isFunc: true
            });
            return isInFunctionBody;
        } else {
            this.setState({
                isFunc: false
            });
        }

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

    detectFunctionBody(textArr, breakpoint) {
        const arr = "anOverlyComplicatedVariableName";
        let start, end;
        for(let i = 0; i < textArr.length && i <= breakpoint; i ++) {
            if(textArr[i].indexOf("function") !== -1 || textArr[i].indexOf("=>{") !== -1) {
                let extraCurlyCounter = 0;
                for(let j = i; j < textArr.length; j ++) {
                    if(j !== i && textArr[j].indexOf("{") !== -1) {
                        extraCurlyCounter ++;
                    } else if(textArr[j].indexOf("}") !== -1  && extraCurlyCounter !== 0) {
                        extraCurlyCounter --;
                    } else if(textArr[j].indexOf("}") !== -1 && extraCurlyCounter === 0) {
                        if(i + 1 <= breakpoint && breakpoint <= j + 1){
                            console.log("youre in a function")
                            start = i;
                            end = j;

                            textArr.splice(start, 0, "resetCursor();"); //Resets cursor before function body
                            textArr.splice(start, 0, `let ${arr} = [];`);  //Creates array
                            textArr.splice(start + 2, 1);
                            textArr.splice(start+2, 0, `${arr}.push(JSON.parse(JSON.stringify(getCursor())));`)    //Stores value at beginning of function body
                            textArr.splice(end+3, 0, `return ${arr};`);  //All values get returned at end
                            textArr.splice(end+3, 0, `${arr}.push(JSON.parse(JSON.stringify(getCursor())));`)    //Stores value at beginning of each loop iteration in it
                            textArr.splice(end + 2, 1);

                            const getDiff = (obj1, obj2) => {
                                let diff = null;
                                Object.keys(obj1).map(function(key) {
                                    if(typeof obj1[key] === "object") {
                                        let temp = getDiff(obj1[key], obj2[key]);
                                        if(temp)
                                            diff[key] = temp; 
                                    } else if(obj1[key] !== obj2[key]) {
                                        if(diff === null)
                                            diff = {}
                                        diff[key] = obj2[key];
                                    }
                                })
                                return diff;
                            }
                            
                            let text = textArr.join("\n")
                            // eslint-disable-next-line
                            let func = Function(`'use strict'; ${text}`);
                            let beforeAfter = func();
                            const diff = getDiff(beforeAfter[0], beforeAfter[1]);

                            console.log(diff)
                            return diff;
                        } else break;
                    }
                }
            }
        }
        return null;
    }

    detectLoops(textArr, breakpoint) {
        const counter = "anOverlyComplicatedVariableName";
        let start, end, text = null, alreadyInit = false;

        const hasLoop = i => {
            if(textArr[i].indexOf("while(") !== -1 || textArr[i].indexOf("for(") !== -1 || textArr[i].indexOf("do {") !== -1)
                return true;
            return false;
        }

        textArr.unshift("resetCursor();");

        for(let i = 0; i < textArr.length && i <= breakpoint; i ++) {
            if(hasLoop(i)) {
                let extraCurlyCounter = 0;
                for(let j = i; j < textArr.length; j ++) {
                    if((j !== i && textArr[j].indexOf("{") !== -1) && !hasLoop(j)) {
                        extraCurlyCounter ++;
                    } else if(textArr[j].indexOf("}") !== -1  && extraCurlyCounter !== 0) {
                        extraCurlyCounter --;
                    } else if((textArr[j].indexOf("}") !== -1 && extraCurlyCounter === 0) && (i + 1 <= breakpoint && breakpoint <= j + 1)){
                            console.log(textArr[i])
                            start = i;
                            end = j;
                            console.log(textArr.length);
                            if(!alreadyInit){
                                textArr.splice(start, 0, `let ${counter} = [];`);  //Creates array
                                textArr.splice(start+2, 0, `${counter}.push(JSON.parse(JSON.stringify(getCursor())));`)    //Stores value at beginning of each loop iteration in it
                            } else {
                                textArr.splice(start+1, 0, `${counter}.push(JSON.parse(JSON.stringify(getCursor())));`)    //Stores value at beginning of each loop iteration in it
                            }
                            if(!alreadyInit)
                                textArr.splice(end+4, 0, `${counter}.push(JSON.parse(JSON.stringify(getCursor())));`)    //Stores value at beginning of each loop iteration in it
                            
                            i += 3;
                            breakpoint += 3;
                            alreadyInit = true;
                            break;
                    }
                }
            }
        }

        if(alreadyInit) {
            console.log(textArr);
            textArr.splice(end+5, 0, `return ${counter};`);  //All values get returned at end
            text = textArr.join("\n");
            
            // eslint-disable-next-line
            let func = Function(`'use strict'; ${text}`);
            return func();
        }
        return null;
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
            <div id = "popover_inside">
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
                        
                    <div >
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
                                        <div className = "col-6">
                                            <h4>Cursor State</h4>
                                            {
                                                this.state.isFunc && this.state.index === 0
                                                ?
                                                    <h7>Before function</h7>
                                                :
                                                    this.state.isFunc && this.state.index === 1
                                                    ?
                                                    <h7>After function</h7>
                                                    :
                                                        this.state.index === 0 
                                                        ? 
                                                        <h7> Pre-loop cursor</h7>
                                                        :
                                                        <h7> Iteration {this.state.index} of {this.state.maxIndex}</h7>

                                            }
                                        </div>
                                    <div className = "col-3">
                                        <IconButton
                                            onClick={ () => this.handleButtonClick("right") }
                                            variant="raised"
                                            color="primary">
                                            <Icon className="material-icons">chevron_right</Icon>
                                        </IconButton>
                                    </div>
                                </div> 
                            : <h4 id = "title">Cursor State</h4>
                        
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