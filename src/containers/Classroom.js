import Classroom from '../components/layouts/Classroom.js';
import PropTypes from 'prop-types';

import * as AuthActions from '../actions/authActions.js';
import * as EditorActions from '../actions/editorActions.js';
import * as ProjectActions from '../actions/projectActions.js';
import * as SceneActions from '../actions/sceneActions.js';
import * as CourseActions from '../actions/courseActions.js';
import * as ClassroomActions from '../actions/classroomActions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// This makes sure we are getting what we think we should
Classroom.propTypes = {
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
    courses: state.courses,
    classrooms: state.classrooms
});

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
    editorActions: bindActionCreators(EditorActions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch),
    sceneActions: bindActionCreators(SceneActions, dispatch),
    projectActions: bindActionCreators(ProjectActions, dispatch),
    courseActions: bindActionCreators(CourseActions, dispatch),
    classroomActions: bindActionCreators(ClassroomActions, dispatch)
});

// This does the binding to the redux store
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Classroom);
