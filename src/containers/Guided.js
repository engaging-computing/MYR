import React from 'react';
import Editor from '../components/Editor';
import View from '../components/View';
import Header from '../components/Header';
import Lesson from '../components/Lesson';
import PropTypes from 'prop-types';

import * as EditorActions from '../actions/editorActions';
import * as AuthActions from '../actions/authActions';
import * as SceneActions from '../actions/sceneActions';
import * as LessonActions from '../actions/lessonActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
* @param {array} actions - render, recover, refresh
* @param {array} level -
* @param {array} levelActions -
*
* @returns - JSX expression
*/
const Guided = ({ editor, user, scene, lesson, lessonActions, actions, authActions, match, sceneActions }) => (
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
        <Lesson lesson={lesson} actions={actions} lessonActions={lessonActions} />
        <div className='guided'>
          <Editor text={editor.text} user={user} />
        </div>
      </div>
      <div id="scene" className="col-12 col-md-8">
        <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
      </div>
    </div>
  </div>
);

// This makes sure we are getting what we think we should
Guided.propTypes = {
  editor: PropTypes.object.isRequired,
  user: PropTypes.object,
  scene: PropTypes.object.isRequired,
  lesson: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  editor: state.editor,
  user: state.user.user,
  scene: state.scene,
  lesson: state.lesson
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EditorActions, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch),
  sceneActions: bindActionCreators(SceneActions, dispatch),
  lessonActions: bindActionCreators(LessonActions, dispatch)
});

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guided);
