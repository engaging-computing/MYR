import React from 'react';
import Editor from '../components/Editor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lesson from '../components/Lesson';
import View from '../components/View';
import PropTypes from 'prop-types';

import * as EditorActions from '../actions/editorActions';
import * as AuthActions from '../actions/authActions';
import * as SceneActions from '../actions/sceneActions';
import * as LessonActions from '../actions/lessonActions';
import * as ProjectActions from '../actions/projectActions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Guided = ({ editor, user, scene, lesson, lessonActions, editorActions, authActions, projectActions, projects, match, sceneActions }) => (
  <div className="App">
    <Header
      logging={authActions}
      sceneActions={sceneActions}
      actions={editorActions}
      user={user}
      scene={scene}
      text={editor.text}
      message={editor.message}
      projectId={match.params.id}
      projectActions={projectActions}
      projects={projects} />
    <div className="row no-gutters">
      <div id="interface" className="col-12 col-md-4">
        <Lesson lesson={lesson} actions={editorActions} lessonActions={lessonActions} />
        <div className='guided'>
          <Editor text={editor.text} user={user} />
        </div>
      </div>
      <div id="scene" className="col-12 col-md-8">
        <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
      </div>
    </div>
    <Footer />
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
  lesson: state.lesson,
  projects: state.project
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
  editorActions: bindActionCreators(EditorActions, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch),
  sceneActions: bindActionCreators(SceneActions, dispatch),
  lessonActions: bindActionCreators(LessonActions, dispatch),
  projectActions: bindActionCreators(ProjectActions, dispatch)
});

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guided);
