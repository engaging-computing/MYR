import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store';

import AppRoutes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root'));

