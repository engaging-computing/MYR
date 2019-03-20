import { createStore, combineReducers, applyMiddleware } from 'redux';
import editor from './editor';
import project from './project';
import scene from './scene';
import user from './user';
import courses from './course';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  editor,
  user,
  scene,
  project,
  courses
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
