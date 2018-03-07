import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

export default class Editor extends Component {

  remove = () => {
    let el = document.querySelector('a-scene')
    document.querySelector('#scene').removeChild(el);
  }
  
  buttons = () => (
    <div className="btn-group pull-left" role="group" aria-label="...">
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-success" onClick={this.handleSave}>Render Scene</button>
      </div>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-default">Generate Random</button>
      </div>
      <div className="btn-group" role="group" onClick={this.remove}>
        <button type="button" className="btn btn-danger"> Clear Scene</button>
      </div>
    </div>
  )

  handleSave = () => {
    const content = this.refs.aceEditor.editor.session.getValue()
    this.props.actions.render(content)
  }

  render() {
    const text = this.props.text
    return (
      <div id="editor" className="col-lg-4">
        <AceEditor
          ref="aceEditor"
          width="100%"
          mode="javascript"
          theme="github"
          // onChange={this.onChange}
          value={text}
          name="ace-editor"
        />
        {this.buttons()}
      </div>
    );
  }
}