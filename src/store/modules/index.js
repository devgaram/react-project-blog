import { combineReducers } from 'redux';
import blog from './blog';
//import ui from './ui';
import auth from './auth';

export default combineReducers({
  blog,
 // ui,
  auth
});