import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";
import "brace/ext/language_tools";
import customCompleter from "./customCompleter.js";

import "brace/ext/searchbox";

/**
* @summary - Editor is a React Component that creat the Ace Editor in the DOM.
*
*/

class Editor extends Component {
    componentWillUnmount() {
    //Updates state in reducer before closing editor
        const text = window.ace.edit("ace-editor").getSession().getValue();
        this.props.refresh(text, this.props.user ? this.props.user.uid : "anon");

        //Forces render cycle so user sees up to date view when viewonly loads
        this.props.render(text);
    }

    componentDidMount() {
        try {
            this.refs.aceEditor.editor.completers = [customCompleter];
        } catch (error) {
            console.error("Unable to attach custom completers");
        }
    }

    /**
  * @summary -render(), creates the editor in the DOM
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
                ref="aceEditor"
                theme="github"
                value={this.props.text}
                width="100%"
                wrapEnabled={true}
                enableBasicAutocompletion={false}
                enableLiveAutocompletion={true}
            />
        );
    }
}

export default Editor;
