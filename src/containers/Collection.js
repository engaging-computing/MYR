import Collection from "../components/layouts/Collection.js";
import PropTypes from "prop-types";

import * as AuthActions from "../actions/authActions.js";
import * as EditorActions from "../actions/editorActions.js";
import * as ProjectActions from "../actions/projectActions.js";
import * as SceneActions from "../actions/sceneActions.js";
import * as CourseActions from "../actions/courseActions.js";
import * as CollectionActions from "../actions/collectionActions.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

/**
 * This makes sure we are getting what we think we should
 */
Collection.propTypes = {
    editor: PropTypes.object.isRequired,
    user: PropTypes.object,
    scene: PropTypes.object.isRequired,
};

/**
 * This makes the values accessible as props
 * @param {*} state Entire redux store state
 */
const mapStateToProps = state => ({
    editor: state.editor,
    user: state.user.user,
    scene: state.scene,
    projects: state.project,
    courses: state.courses,
    collections: state.collections
});

/**
 * This maps dispatch actions to props
 * @param {*} dispatch Give dipatch to the store
 */
const mapDispatchToProps = dispatch => ({
    editorActions: bindActionCreators(EditorActions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch),
    sceneActions: bindActionCreators(SceneActions, dispatch),
    projectActions: bindActionCreators(ProjectActions, dispatch),
    courseActions: bindActionCreators(CourseActions, dispatch),
    collectionActions: bindActionCreators(CollectionActions, dispatch)
});

/**
 * This does the binding to the redux store
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Collection);
