import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";
import "brace/ext/searchbox";
import "brace/ext/language_tools";

import customCompleter from "./customCompleter.js";
import KeyboardShortcut from "./KeyboardShortcut.js";
import { browserType } from "../../utils/browserType";

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
                    value={this.props.text}
                    width="100%"
                    wrapEnabled={true}
                    enableBasicAutocompletion={false}
                    enableLiveAutocompletion={true}
                    onLoad={this.onLoad}
                />
                { browserType() === "desktop" ? <KeyboardShortcut/> : null }
            </div>
        );
    }
}

export default Editor;
