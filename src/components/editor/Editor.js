import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";
import "brace/ext/language_tools";
import customCompleter from "./customCompleter.js";

import "brace/ext/searchbox";

/**
 * Editor is a React Component that creat the Ace Editor in the DOM.
 */

class Editor extends Component {
    componentWillUnmount() {
        // Updates state in reducer before closing editor
        const text = window.ace.edit("ace-editor").getSession().getValue();
        this.props.refresh(text, this.props.user ? this.props.user.uid : "anon");

        // Forces render cycle so user sees up to date view when viewonly loads
        this.props.render(text);
    }

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
            <AceEditor
                editorProps={{
                    $blockScrolling: Infinity,
                }}
                height="94vh"
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
        );
    }
}

export default Editor;
