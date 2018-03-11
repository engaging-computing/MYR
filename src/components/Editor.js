import React, { Component } from 'react';
import AceEditor from 'react-ace';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import 'brace/mode/javascript';
import 'brace/theme/github';

export default class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  remove = () => {
    this.props.actions.refresh("");
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  buttons = () => {
    const style = {
      margin: 2,
    };
    return (
      <div className="btn-group pull-left" role="group" aria-label="...">
        <RaisedButton
          label="Render Scene"
          primary={true}
          onClick={this.handleRender}
          style={style}
        />
        <RaisedButton
          label="Clear Scene"
          secondary={true}
          onClick={this.remove}
          style={style}
        />
        <RaisedButton
          style={style}
          onClick={this.handleClick}
          label="Options"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Save Scene" onClick={this.handleSave} />
            <MenuItem primaryText="Generate Random" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
        {this.props.children}
      </div>
    )
  }

  handleSave = () => {
    // stub
    let modes = ['equirectangular', 'perspective'];
    document.querySelector('a-scene').components.screenshot.capture(modes[0]);
    document.querySelector('a-scene').components.screenshot.capture(modes[1]);
  }

  handleRender = () => {
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
          value={text}
          name="ace-editor"
        />
        {this.buttons()}
      </div>
    );
  }
}