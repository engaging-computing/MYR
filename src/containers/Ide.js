import React from 'react';
import Editor from '../components/Editor';
import Footer from '../components/Footer';
import Header from '../components/Header';
import View from '../components/View';
import PropTypes from 'prop-types';

import * as actions from '../actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Ide = ({ editor, editorActions, user, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match }) => (
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
      match={match}
      projectActions={projectActions}
      courseActions={courseActions}
      projects={projects}
      courses={courses}
    />
    <div className="row no-gutters">
      {
        scene.viewOnly
          ?
          <div id="scene" className="col-12" >
            <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
          </div>
          :
          <>
            <div id="interface" className="col-12 col-md-5" >
              <Editor text={editor.text} user={user} />
            </div>
            <div id="scene" className="col-12 col-md-7" >
              <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
            </div>
          </>
      }
    </div>
    <Footer />
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
  projects: state.project,
  courses: state.courses
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
  editorActions: bindActionCreators(actions.EditorActions, dispatch),
  authActions: bindActionCreators(actions.AuthActions, dispatch),
  sceneActions: bindActionCreators(actions.SceneActions, dispatch),
  projectActions: bindActionCreators(actions.ProjectActions, dispatch),
  courseActions: bindActionCreators(actions.CourseActions, dispatch)
});

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ide);
