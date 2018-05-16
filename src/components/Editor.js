import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

/**x
 * The Editor component is where you are able to input code and 
 * have it render in the View. 
 * Application state is from the Redux Store and the models are 
 * from Firebase Firestore.
 */

class Editor extends Component {

  componentDidUpdate() {
    this.refs.aceEditor.editor.focus();
  }

  render() {
    return (
      <div id="editor" >
        <AceEditor ref="aceEditor" width="100%" mode="javascript" theme="github" value={this.props.text} name="ace-editor" className="d-none d-md-block" />
      </div>
    );
  }
}

export default Editor;