import React from 'react';
import Editor from '../components/Editor';
import View from '../components/View';
import Header from '../components/Header';
import Level from '../components/Level';
import PropTypes from 'prop-types';

import * as EditorActions from '../actions/editorActions.js';
import * as AuthActions from '../actions/authActions.js';
import * as SceneActions from '../actions/sceneActions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const sampleLevel = {
  id: 1,
  name: "Intro to MYR",
  stages: [
    {
      isQuiz: false,
      prompt: "Here we learn about functions",
      levelText: "Functions do things and stuff",
      sceneText: `sphere()`,

    },
    {
      isQuiz: true,
      prompt: "What is MYR?",
      sceneText: `sphere()\nsphere()`,
      opts: [
        {
          text: "A Lemon",
          value: false,
        },
        {
          text: "A VR Platform",
          value: true,
        },
      ]
    },
    {
      isQuiz: true,
      prompt: "Do you like it?",
      sceneText: `sphere()\nsphere()`,
      opts: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: true,
        },
      ]
    }
  ]
}


/**
* @summary - Guided is used for scripted lesson plans. This path is tightly controlled
* and designed to reduce errors at the cost of some creative freedom. 
* 
* @param {string} text - text for the editor
* @param {array} objects - objects for the MYR render
* @param {array} assets - obj models
* @param {object} user - user info
* @param {object} scene - screne name and id
* @param {string} errors - errors from the render process
* @param {array} actions - render, recover, rrfresh
* 
* @returns - JSX expression
*/
const Guided = ({ text, objects, assets, user, scene, message, actions, authActions, match, sceneActions }) => (
  <div className="App">
    <Header logging={authActions} sceneActions={sceneActions} actions={actions} user={user} scene={scene} text={text} message={message} projectId={match.params.id} />
    <div className="row no-gutters">
      <div id="interface" className="col-12 col-md-4">
        <div  style={{ height: "24vh" }}>
          <Level level={sampleLevel} actions={actions} />
        </div>
        <div className='guided'>
          <Editor  objects={objects} text={text} user={user} />
        </div>
      </div>
      <div id="scene" className="col-12 col-md-8">
        <View objects={objects} sceneConfig={scene.sceneConfig} assets={assets} />
      </div>
    </div>
  </div>
);

// This makes sure we are getting what we think we should
Guided.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.object,
  message: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired,
  scene: PropTypes.object.isRequired,
};
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
)(Guided);