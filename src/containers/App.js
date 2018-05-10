import React from 'react';
import Editor from '../components/Editor';
import View from '../components/View';
import Header from '../components/Header';
import Terminal from '../components/Terminal';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { darkBlack, red600, white } from 'material-ui/styles/colors';
import * as EditorActions from '../actions/editorActions.js';
import * as AuthActions from '../actions/authActions.js';
import * as SceneActions from '../actions/sceneActions.js';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const muiTheme = getMuiTheme({
  palette: {
    // primary1Color: "#E53935",
    accent1Color: red600,
    textColor: darkBlack,
    alternateTextColor: white,
  },
  fontFamily: 'Roboto, sans-serif',
});

const App = ({ text, objects, actions, assets, user, scene, errors, authActions, sceneActions }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="App">
      <Header logging={authActions} sceneActions={sceneActions} actions={actions} user={user} scene={scene} />
      <div className="row no-gutters">
        <div id="interface" className="col-12 col-md-4">
          <Editor actions={actions} sceneActions={sceneActions} objects={objects} text={text} user={user} scene={scene} />
          <Terminal errors={errors} />
        </div>
        <View objects={objects} assets={assets} />
      </div>
    </div>
  </MuiThemeProvider >
);

// This makes sure we are getting what we think we should
App.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.object,
  errors: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
  scene: PropTypes.object.isRequired,
};

// This makes the values accessible as props
const mapStateToProps = state => ({
  text: state.editor.text,
  errors: state.editor.errors,
  objects: state.editor.objects,
  assets: state.editor.assets,
  user: state.user.user,
  scene: state.scene.scene,
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
)(App);

