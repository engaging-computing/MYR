import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';


/**
* @summary - Editor is a React Component that creat the Ace Editor in the DOM. 
* 
*/
class Editor extends Component {

  /**
  * @summary -render(), creates the editor in the DOM
  */
  render() {
    return (
      <div id="editor" >
        <AceEditor 
        className="d-none d-md-block"
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
        wrap={true} />
      </div>
    );
  }
}

export default Editor;