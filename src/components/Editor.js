import React, { Component } from 'react';
import AceEditor from 'react-ace';
import RaisedButton from 'material-ui/RaisedButton';
import 'brace/mode/javascript';
import 'brace/theme/github';

export default class Editor extends Component {

  remove = () => {
    this.props.actions.refresh("");
  }
  
  buttons = () => {
    const style = {
      margin: 2,
    };
    return (
      <div className="btn-group pull-left" role="group" aria-label="...">
        <RaisedButton
          label="Render Scene"
          primary={true}
          onClick={this.handleSave}
          style={style}
        />
        <RaisedButton
          label="Generate Random"
          style={style}
        />
        <RaisedButton
          label="Clear Scene"
          secondary={true}
          onClick={this.remove}
          style={style}
        />
        {this.props.children}
      </div>
    )
  }

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