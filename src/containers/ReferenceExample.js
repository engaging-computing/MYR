import PropTypes from "prop-types";
import ReferenceExample from "../components/layouts/ReferenceExample.js";
import * as Actions from "../actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

/**
 * This makes sure we are getting what we think we should
 */
ReferenceExample.propTypes = {
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
    collections: state.collections,
    referenceExample: state.referenceExample
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
    referenceExampleActions: bindActionCreators(Actions.ReferenceExampleActions, dispatch)
});

/**
 * This does the binding to the redux store
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferenceExample);
