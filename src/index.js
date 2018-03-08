import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import './css/App.css';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Myr from './myr/Myr'

window.Myr = Myr
const store = createStore(reducer)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
