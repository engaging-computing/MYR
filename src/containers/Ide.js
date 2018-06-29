import React from 'react';
import Editor from '../components/Editor';
import View from '../components/View';
import Header from '../components/Header';
import PropTypes from 'prop-types';

import * as EditorActions from '../actions/editorActions.js';
import * as AuthActions from '../actions/authActions.js';
import * as SceneActions from '../actions/sceneActions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Ide = ({ editor, actions, user, scene, authActions, sceneActions, match }) => (
  <div className="App">
    <Header 
      logging={authActions}
      sceneActions={sceneActions}
      actions={actions}
      user={user}
      scene={scene}
      text={editor.text}
      message={editor.message}
      projectId={match.params.id} />
    <div className="row no-gutters">
      <div id="interface" className="col-12 col-md-4">
        <Editor text={editor.text} user={user} />
      </div>
      <div id="scene" className="col-12 col-md-8">
        <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
      </div>
    </div>
  </div>
);

// This makes sure we are getting what we think we should
Ide.propTypes = {
  editor: PropTypes.object.isRequired,
  user: PropTypes.object,
  scene: PropTypes.object.isRequired,
};

// This makes the values accessible as props
const mapStateToProps = state => ({
  editor: state.editor,
  user: state.user.user,
  scene: state.scene,
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EditorActions, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch),
  sceneActions: bindActionCreators(SceneActions, dispatch)
});

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ide);
