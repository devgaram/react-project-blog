import { take, call, put, fork, takeEvery } from "redux-saga/effects";
import { Github } from "api";
import { REQUEST_UPDATE_FILE } from "store/actions";

export function* requestUpdateFile() {
  while (true) {
    let { payload } = yield take(REQUEST_UPDATE_FILE);
    //yield call(Github.updateFile, payload);
  }
}

export default function* authSaga() {
  yield fork(requestUpdateFile);
}
