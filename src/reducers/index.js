import { combineReducers } from 'redux';
import editor from './editor';
import user from './user';
import scene from './scene';

const aframeApp = combineReducers({
  editor,
  user,
  scene
});

export default aframeApp;