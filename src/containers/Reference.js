import PropTypes from "prop-types";
import ReferencePage from "../components/layouts/Reference.js";
import TextureReferencePage from "../components/layouts/TextureReference.js";
import ModelReferencePage from "../components/layouts/ModelReference.js";
import * as Actions from "../actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

/**
 * This makes sure we are getting what we think we should
 */
ReferencePage.propTypes = {
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
    editorActions: bindActionCreators(Actions.EditorActions, dispatch),
    authActions: bindActionCreators(Actions.AuthActions, dispatch),
    sceneActions: bindActionCreators(Actions.SceneActions, dispatch),
    projectActions: bindActionCreators(Actions.ProjectActions, dispatch),
    courseActions: bindActionCreators(Actions.CourseActions, dispatch),
    collectionActions: bindActionCreators(Actions.CollectionActions, dispatch)
});

/**
 * This does the binding to the redux store
 */
const Reference = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferencePage);

const TextureReference = connect(
    mapStateToProps,
    mapDispatchToProps
)(TextureReferencePage);

const ModelReference = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelReferencePage);

export { Reference, TextureReference, ModelReference };
