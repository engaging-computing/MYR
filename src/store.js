import { createStore, combineReducers, applyMiddleware } from 'redux';
import editor from './reducers/editor';
import project from './reducers/project';
import scene from './reducers/scene';
import user from './reducers/user';
import courses from './reducers/course';

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
