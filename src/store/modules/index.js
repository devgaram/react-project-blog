import { combineReducers } from 'redux';
import blog from './blog';
import ui from './ui'

export default combineReducers({
  blog,
  ui
});