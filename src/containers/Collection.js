import Collection from "../components/layouts/Collection.js";
import PropTypes from "prop-types";

import * as Actions from "../actions";


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
    userSettings: state.user.settings,
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
    editorActions: bindActionCreators(Actions.EditorActions, dispatch),
    authActions: bindActionCreators(Actions.AuthActions, dispatch),
    sceneActions: bindActionCreators(Actions.SceneActions, dispatch),
    projectActions: bindActionCreators(Actions.ProjectActions, dispatch),
    courseActions: bindActionCreators(Actions.CourseActions, dispatch),
    collectionActions: bindActionCreators(Actions.CollectionActions, dispatch),
    userActions: bindActionCreators(Actions.UserActions, dispatch),
});

/**
 * This does the binding to the redux store
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Collection);
