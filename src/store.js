import { createStore, combineReducers, applyMiddleware } from 'redux';
import editor from './reducers/editor';
import lesson from './reducers/lesson';
import project from './reducers/project';
import scene from './reducers/scene';
import user from './reducers/user';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  editor,
  user,
  scene,
  lesson,
  project
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
