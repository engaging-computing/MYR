import { combineReducers } from 'redux';
import editor from './editor';
import user from './user';

const aframeApp = combineReducers({
  editor,
  user
});

export default aframeApp;