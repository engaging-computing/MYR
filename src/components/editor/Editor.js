import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";
import "brace/ext/searchbox";
import "brace/ext/language_tools";

import customCompleter from "./customCompleter.js";
import KeyboardShortcut from "./KeyboardShortcut.js";
import { browserType } from "../../utils/browserType";
import FontSize from "./FontSize.js";
import copy from "copy-to-clipboard";

/**
 * Editor is a React Component that create the Ace Editor in the DOM.
 */
class Editor extends Component {
    /**
     * Called when the Edtior is unmounting (Being removed from the DOM)
     * 
     * Editor will unmount when MYR enters ViewOnly mode, and we want to render
     * whatever the code that's in the editor.
     */
    componentWillUnmount() {
        this.refreshText();
    }

    refreshText = () => {
        // Updates state in reducer before closing editor
        const text = window.ace.edit("ace-editor").getSession().getValue();
        this.props.refresh(text, this.props.user ? this.props.user.uid : "anon");

        // Forces render cycle so user sees up to date view when viewonly loads
        this.props.render(text);
    }

    /**
     * Called when the Editor is mounted (component has been rendererd to the DOM)
     * 
     * It sets custom completer of MYR API to editor, 
     * and add listener to check whether user have unsaved changes.
     */
    componentDidMount() {
        try {
            // eslint-disable-next-line
            this.refs.aceEditor.editor.completers = [customCompleter];
        } catch (error) {
            console.error("Unable to attach custom completers");
        }

        // Warn the issue before refreshing the page
        window.addEventListener("beforeunload", (event) => {
            let text;
            try {
                let editor = window.ace.edit("ace-editor");
                text = editor.getSession().getValue();

            } catch (err) {
                console.error(err);
            }
            if (this.props.savedText !== text) {
                event.preventDefault();
                event.returnValue = "You may have unsaved scene changes!";
            }
        });

        this.setState({"previousSettings":this.props.settings});
    }

    /**
     * Called when the editor is loaded.
     * It sets options to set the maximum error editor accepts and set the EMCAScript version to 6
     */
    onLoad() {
        window.ace.edit("ace-editor").session.$worker.send("setOptions", [{
            "maxerr": 1000,
            "esversion": 6
        }]);
    }

    componentDidUpdate(){
        if(JSON.stringify(this.state.previousSettings) !== JSON.stringify(this.props.settings) &&
        this.props.user) {
            this.props.userActions.updateUserSettings(this.props.user.uid,this.props.settings);
            this.setState({"previousSettings":this.props.settings});
        }
    }
    
    /**
     * Creates the editor in the DOM
     */
    render() {
        return (
            <div>
                <AceEditor
                    editorProps={{
                        $blockScrolling: Infinity,
                    }}
                    height="90vh"
                    mode="javascript"
                    name="ace-editor"
                    // eslint-disable-next-line
                    ref="aceEditor"
                    theme="github"
                    commands={[{
                        name: "copyLine",
                        bindKey: {win: "Ctrl-L", mac: "Command-L"},
                        exec: () => {let line = window.ace.edit("ace-editor").selection.getCursor().row;
                            let copyText = window.ace.edit("ace-editor").session.getTextRange({start: {row: line, column: 0}, end: {row: line + 1, column: 0}});
                            if (copyText.charAt(-1) === "\n") {
                                copyText = copyText.slice(0, -1);
                            }
                            copy(copyText);
                        }
                    }]}
                    fontSize = {this.props.settings.fontSize}
                    value={this.props.text}
                    width="100%"
                    wrapEnabled={true}
                    enableBasicAutocompletion={false}
                    enableLiveAutocompletion={true}
                    onLoad={this.onLoad}
                />
                { browserType() === "desktop" ? <div><KeyboardShortcut/> 
                    <FontSize userActions={this.props.userActions} settings={this.props.settings} refreshText={this.refreshText}/></div> : null }
            </div>
        );
    }
}

export default Editor;
