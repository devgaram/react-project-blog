import { take, call, takeEvery, put, fork } from 'redux-saga/effects';
import {
  getBlogPosts
 } from 'lib/web-api';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  receivePosts
} from 'store/modules/blog';

export function* requestPosts() {
  while (true) {
    const action = yield take(REQUEST_POSTS);
    const payload = yield call(getBlogPosts, action.payload);
    yield put(receivePosts(payload));
  }
}

export default function* blogSaga() {
  yield fork(requestPosts);
}