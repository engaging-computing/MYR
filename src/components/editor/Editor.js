import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";
import "brace/ext/searchbox";
import "brace/ext/language_tools";
import {
    Button,
    Icon,
    Tooltip,
    Popover,
} from "@material-ui/core";

import customCompleter from "./customCompleter.js";
import KeyboardShortcut from "./keyboardShortcut.js";


/**
 * Editor is a React Component that creat the Ace Editor in the DOM.
 */

class Editor extends Component {
    constructor(props){
        super(props);
        this.state = {
            shortcutOpen: false,
            anchorEl: null,
        };
    }
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

    handleShortcutClick = (event) =>{
        this.setState({shortcutOpen: true});
        this.setState({anchorEl: event.target});
    }

    handleShortcutClose = () => {
        this.setState({shortcutOpen: false});
        this.setState({anchorEl: null});
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
                <Tooltip title="Keyboard Shortcut">
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={this.handleShortcutClick}>
                        <Icon className="material-icons">keyboard</Icon>
                    </Button>
                </Tooltip>
                <Popover
                    id="simple-popover"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical:"top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "bottom",
                        hotizontal: "left"
                    }}
                    open={this.state.shortcutOpen}
                    onClose={this.handleShortcutClose}>
                    <KeyboardShortcut/>
                </Popover>
            </div>
        );
    }
}

export default Editor;
