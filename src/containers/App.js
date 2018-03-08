import React from 'react';
import Editor  from '../components/Editor';
import View from '../components/View';
import Reference from '../components/Reference';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as EditorActions from '../actions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// App is a container because it manages state for Components
const App = ({text, objects, actions}) => (
  <div className="App">
    <header className="App-header">
     <h1>MYR</h1>
    </header>
    <div>
      <MuiThemeProvider>
        <Editor text={text} actions={actions} >
          <Reference />
        </Editor>
      </MuiThemeProvider>
      <View text={text} objects={objects} />
    </div>
  </div>
)

// This makes sure we are getting what we think we should
App.propTypes = {
  text: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

// This makes the values accessible as props
const mapStateToProps = state => ({
  text: state.editor.text,
  objects: state.editor.objects,
})

// This maps dispatch actios to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EditorActions, dispatch)
})

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

