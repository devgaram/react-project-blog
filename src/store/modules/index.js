import { combineReducers } from "redux";
//import ui from './ui';
import auth from "./auth";
import blog from "../reducers/blog.reducer";

export default combineReducers({
  // ui,
  auth,
  blog
});
