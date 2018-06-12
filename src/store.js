import { createStore, combineReducers, applyMiddleware } from 'redux'
import editor from './reducers/editor';
import user from './reducers/user';
import scene from './reducers/scene';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  editor,
  user,
  scene
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store;