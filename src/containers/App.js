import React from 'react'
import Editor from '../components/Editor'
import View from '../components/View'
import Reference from '../components/Reference'
import Header from '../components/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as EditorActions from '../actions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const App = ({ text, objects, actions, assets, user, sceneName }) => (
  <MuiThemeProvider>
    <div className="App">
      <Header actions={actions} user={user} sceneName={sceneName}/>
      <div>
        <Editor actions={actions} objects={objects} text={text} user={user} sceneName={sceneName}>
          <Reference />
        </Editor>
        <View text={text} objects={objects} assets={assets} />
      </div>
    </div>
  </MuiThemeProvider>
)

// This makes sure we are getting what we think we should
App.propTypes = {
  text: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
}

// This makes the values accessible as props
const mapStateToProps = state => ({
  text: state.editor.text,
  objects: state.editor.objects,
  assets: state.editor.assets, 
  user: state.editor.user,
  sceneName: state.editor.sceneName,
})

// This maps dispatch actions to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EditorActions, dispatch)
})

// This does the binding to the redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

