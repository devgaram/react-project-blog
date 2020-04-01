import { all } from "redux-saga/effects";
import auth from "./auth";
import blog from "./blog";

export default function* root() {
  yield all([auth(), blog()]);
}
