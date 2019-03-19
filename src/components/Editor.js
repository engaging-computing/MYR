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

  componentDidMount() {
    this.refs.aceEditor.editor.completers = [customCompleter];
  }

  /**
  * @summary -render(), creates the editor in the DOM
  */
  render() {
    return (
      <AceEditor
        editorProps={{
          $blockScrolling: true,
        }}
        height="94vh"
        mode="javascript"
        name="ace-editor"
        ref="aceEditor"
        theme="github"
        value={this.props.text}
        width="100%"
        wrap={true}
        enableBasicAutocompletion={false}
        enableLiveAutocompletion={true}
      />
    );
  }
}

export default Editor;
