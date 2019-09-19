import React, {Component} from 'react';
import {
        Icon, 
        IconButton,
        Popover,
        Divider
    } from '@material-ui/core/';
import "../../css/CursorState.css";


/** TODO
 * 2. Make pretty
 * 
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

        //Sets focus in ace editor when page loads, which fixes a bug where 
        //it wouldn't be focusable after reloading page
        let editor = window.ace.edit("ace-editor");
        editor.focus(); 
        const n = editor.getSession().getValue().split("\n").length;
        editor.gotoLine(n); 

        const getGutterClick = (e) => {  
            if (window.event) e = window.event.srcElement// (IE 6-8)
            else e = e.target;     
            
            if (e.className && e.className.indexOf('ace_gutter-cell') !== -1) { 
                let cursorState;               
                let selectionRange = window.ace.edit("ace-editor").getSelectionRange().start.row + 1;
                const data = this.parseFullTextIntoArray(selectionRange);
                let text = data[0];
                let type = data[1];

                //If we clicked on text not in a function or a loop
                if(type === "normal") {
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
                        isFunc: false,
                        params: null
                    });
                //If we clicked on text in a function
                } else if(type === "func"){
                    self.setState({
                        anchorEl: e,
                        obj: text,
                        arr: null,
                        isArr: false,
                        index: 0,
                        maxIndex: 0,
                        isFunc: true,
                        params: this.findParams()
                    });
                    console.log(this.state.params);
                //If we clicked on text in a loop
                } else if(type === "loop"){
                    self.setState({
                        anchorEl: e,
                        obj: text[0],
                        arr: text,
                        isArr: true,
                        index: 0,
                        maxIndex: text.length - 1,
                        isFunc: false,
                        params: null
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

        //Checks for a function body click
        let isInFunctionBody = this.detectFunctionBody(this.removeComments(editorDoc.$lines.slice(0, editorDoc.$lines.length)), breakpoint);
        if(isInFunctionBody) return [isInFunctionBody, "func"];
        
        //Checks for a click inside of loop(s)
        let hasLoop = this.detectLoops(this.removeComments(editorDoc.$lines.slice(0, editorDoc.$lines.length)), breakpoint);
        if(hasLoop) return [hasLoop, "loop"];

        //Handles a click outside of a function & loop
        let textContainingState = editorDoc.$lines.slice(0, breakpoint);
        textContainingState = this.removeComments(textContainingState);
        textContainingState.unshift("resetCursor();"); //Resets cursor before running code
        textContainingState.push("return getCursor();"); //Now will return the cursor value after the breakpoint

        /* This gets appended to the first array despite it being 'out of bounds'
         * to prevent an error from being thrown if there was a function called 
         * that was defined after the breakpoint  */
        let extraInfoText = editorDoc.$lines.slice(breakpoint, editorDoc.$lines.length);
        extraInfoText = this.removeComments(extraInfoText);

        const modifiedTextArr = textContainingState.concat(extraInfoText);
        return [modifiedTextArr.join("\n"), "normal"];
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
                                        if(temp) {
                                            if(diff === null) {
                                                diff = {};
                                            }
                                            diff[key] = temp; 
                                        }
                                    } else if(obj1[key] !== obj2[key]) {
                                        if(diff === null)
                                            diff = {};
                                        diff[key] = obj2[key];
                                    }
                                });
                                return diff;
                            }
                            
                            let text = textArr.join("\n");
                            // eslint-disable-next-line
                            let func = Function(`'use strict'; ${text}`);
                            let beforeAfter = func();

                            const diff = getDiff(beforeAfter[0], beforeAfter[1]);
                            if(diff) {
                                return diff;
                            } else {
                                return ["Function made no difference to cursor state"];
                            }
                        } else break;
                    }
                }
            }
        }
        return null;
    }

    findParams() {
        console.log("Finding params");
        let editorDoc = window.ace.edit("ace-editor").getSession().doc;
        let breakpoint = window.ace.edit("ace-editor").getSelectionRange().start.row + 1;
        let textArr = this.removeComments(editorDoc.$lines.slice(0, editorDoc.$lines.length));

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
                            //We found a function, and the breakpoint the user clicked on is within the funtion
                            //textArr[i] is the header of the function
                            let paramStr = textArr[i].slice(textArr[i].indexOf('(') + 1, textArr[i].indexOf(')'))
                            let params =  paramStr.split(", ");
                            console.log(params);
                            return params;
                        } else break;
                    }
                }
            }
        }
    }


    detectLoops(textArr, breakpoint) {
        const counter = "anOverlyComplicatedVariableName";
        let start, text = null, numLoops = 0, endOfOuterLoop;

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
                        start = i;  
                        console.log(i + 1, breakpoint, j);
                        if(numLoops === 0){
                            textArr.splice(start, 0, `let ${counter} = [];`);  //Creates array
                            textArr.splice(start+2, 0, `${counter}.push(JSON.parse(JSON.stringify(getCursor())));`)    //Stores value at beginning of each loop iteration in it
                            i += 3;
                            breakpoint += 3;
                        } else {
                            textArr.splice(start+1, 0, `${counter}.push(JSON.parse(JSON.stringify(getCursor())));`)    //Stores value at beginning of each loop iteration in it
                            i ++;
                            breakpoint ++;
                        }
                        numLoops++;
                        break;
                    } else if((textArr[j].indexOf("}") !== -1 && extraCurlyCounter === 0) && !(i + 1 <= breakpoint && breakpoint <= j + 1)){ 
                        //The loop ended before we hit our breakpoint
                        break;
                    }
                }
            }
        }

        let extraCurlyCounter = 0;
        if(numLoops > 0) {
            for(let i = 0; i < textArr.length && i <= breakpoint; i ++) {
                if(hasLoop(i)) {
                    for(let j = i; j < textArr.length; j ++) {
                        if(j !== i && textArr[j].indexOf("{") !== -1) {
                            extraCurlyCounter ++;
                        } else if(textArr[j].indexOf("}") !== -1  && extraCurlyCounter !== 0) {
                            extraCurlyCounter --;
                        } else if((textArr[j].indexOf("}") !== -1 && extraCurlyCounter === 0) && (i + 1 <= breakpoint && breakpoint <= j + 1)){
                            endOfOuterLoop = j + 1;
                            break;
                        }
                        console.log("Finding loop end point");
                    }
                }
            }
            console.log(endOfOuterLoop);
            textArr.splice(endOfOuterLoop + 1, 0, `${counter}.push(JSON.parse(JSON.stringify(getCursor())));`);  //All values get returned at end
            textArr.splice(endOfOuterLoop + 2, 0, `return ${counter};`);  //All values get returned at end
            text = textArr.join("\n");
            console.log(textArr);
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
            if(shouldRenderOther) {
                return (
                    <div className = "row">
                        {key !== "color" ?
                            <>
                                <div className = "col-8">
                                    <p className = "keyPara"> {this.capitalize(key)}</p>
                                </div> 
                                <div className = "col-4">
                                    <p className = "valuePara"> {this.capitalize(value) + ""}</p>
                                </div> 
                            </>
                            :
                            <>
                                <div className = "col-8">
                                    <p className = "keyPara"> {this.capitalize(key)}</p>
                                </div> 
                                <div className = "col-4">
                                    <div className = "row">
                                        <input style = {{"display": "inline-block"}} type ="color" value = {key} disabled = {true}/>
                                        <p className = "valuePara"> {this.capitalize(value) + ""}</p>
                                    </div>
                                </div> 
                            </>
                        }
                    </div>        
                );
            }
        }
    }
    
    size(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === "object") size++;
        }
        return size;
    };

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
                    
                    <div id = "popover_div">
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
                                {this.size(this.state.obj) > 0 ? <Divider variant="middle" /> : null}
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