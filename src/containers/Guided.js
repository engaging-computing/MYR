import React from 'react';
import Editor from '../components/Editor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Course from '../components/Course';
import View from '../components/View';
import PropTypes from 'prop-types';

import * as Actions from '../actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Guided = ({ editor, user, scene, lesson, editorActions, authActions, projectActions, projects, courseActions, courses, course, match, sceneActions }) => (
  <div className="App">
    <Header
      logging={authActions}
      sceneActions={sceneActions}
      actions={editorActions}
      user={user}
      scene={scene}
      text={editor.text}
      message={editor.message}
      match={match}
      projectId={match.params.id}
      projectActions={projectActions}
      projects={projects}
      courseActions={courseActions}
      courses={courses}
      course={course}
      courseName={match.params.shortname} />
    <div className="row no-gutters">
      <div id="interface" className="col-12 col-md-4">
        <Course lesson={courses.currentLesson} courses={courses} course={course} courseName={match.params.shortname} actions={editorActions} courseActions={courseActions} />
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
  lesson: PropTypes.object,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  editor: state.editor,
  user: state.user.user,
  scene: state.scene,
  lesson: state.courses.currentLesson,
  projects: state.project,
  courses: state.courses,
  course: state.courses.course
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
  editorActions: bindActionCreators(Actions.EditorActions, dispatch),
  authActions: bindActionCreators(Actions.AuthActions, dispatch),
  sceneActions: bindActionCreators(Actions.SceneActions, dispatch),
  projectActions: bindActionCreators(Actions.ProjectActions, dispatch),
  courseActions: bindActionCreators(Actions.CourseActions, dispatch)
});

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guided);
