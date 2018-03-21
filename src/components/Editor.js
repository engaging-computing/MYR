import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { RaisedButton, Popover, Menu, MenuItem } from 'material-ui';
import 'brace/mode/javascript';
import 'brace/theme/github';
// import firebase from '../firebase.js'
// import 'firebase/firestore'

// var auth = firebase.auth();
// var db = firebase.firestore();
// var storageRef = firebase.storage().ref();

class Editor extends Component {

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
          label="Render"
          primary={true}
          onClick={this.handleRender}
          style={style}
        />
        <RaisedButton
          label="Clear"
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
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
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
    // let code = this.refs.aceEditor.editor.session.getValue();
    // let els = window.myr ? window.myr.els : null
    // let uid = auth.currentUser.uid
    // // use uid_epoch as identifier for now
    // let ts = Date.now()
    // let projectID = uid + '_' + ts;
    // let modes = [
    //   'equirectangular',
    //   // 'perspective'
    // ];
    // // upload images
    // for (var mode of modes) {
    //   let img = document.querySelector('a-scene').components.screenshot.getCanvas(mode).toDataURL('image/png');
    //   let path = "images/" + mode + "/" + projectID;
    //   let imgRef = storageRef.child(path);
    //   imgRef.putString(img, 'data_url').then(function(snapshot) {
    //     console.log('Uploaded a data_url string!');
    //   })
    //   .catch(function(error) {
    //     console.error("Error uploading a data_url string ", error);
    //   });
    // }
    // // save code and myr scene els
    // db.collection("scenes").doc(projectID).set({
    //   name: "Unnamed",
    //   code: code,
    //   els: els,
    //   uid: uid,
    //   ts: ts,
    // })
    // .then(function() {
    //     console.log("Document successfully written!");
    // })
    // .catch(function(error) {
    //     console.error("Error writing document: ", error);
    // });

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

export default Editor