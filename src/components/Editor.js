import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/ext/language_tools';
import customCompleter from './customCompleter.js'

/**
* @summary - Editor is a React Component that creat the Ace Editor in the DOM.
*
*/

class Editor extends Component {
  componentWillUnmount() {
    //Refreshes text in state
    this.props.refresh(window.ace.edit("ace-editor").getSession().getValue(), this.props.user ? this.props.user.uid : 'anon');    
  }

  componentDidMount() {
    try {
      this.refs.aceEditor.editor.completers = [customCompleter];
    } catch (error) {
      console.error('Unable to attach custom completers');
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
