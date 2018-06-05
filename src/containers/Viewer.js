import React from 'react';
import View from '../components/View';
import Header from '../components/Header';
import PropTypes from 'prop-types';

import * as EditorActions from '../actions/editorActions.js';
import * as AuthActions from '../actions/authActions.js';
import * as SceneActions from '../actions/sceneActions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const Viewer = ( {text, objects, actions, assets, user, scene, message, authActions, sceneActions }) => (
  <div className="App">
    <Header logging={authActions} sceneActions={sceneActions} actions={actions} user={user} scene={scene} text={text} message={message}/>
    <div className="row no-gutters">
      <div id="scene" className="col-12">
        <View objects={objects} sceneConfig={scene.sceneConfig} assets={assets} />
      </div>
    </div>
  </div>
);


// This makes sure we are getting what we think we should
Viewer.propTypes = {
  objects: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired,
};


// This makes the values accessible as props
const mapStateToProps = state => ({
  text: state.editor.text,
  message: state.editor.message,
  objects: state.editor.objects,
  assets: state.editor.assets,
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
)(Viewer);

