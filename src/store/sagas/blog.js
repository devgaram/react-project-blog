import { take, call, put, fork } from 'redux-saga/effects';
import { Blog } from 'lib/api';
import {
  REQUEST_CATEGORIES,
  REQUEST_POSTS,
  receiveCategories,
  receivePosts
} from 'store/modules/blog';

export function* requestCategories() {
  while (true) {
    yield take(REQUEST_CATEGORIES);
    const categories = yield call(Blog.getCategories);   
    yield put(receiveCategories(categories));
  }
}

export function* requestPosts() {
  while (true) {
    const action = yield take(REQUEST_POSTS);
    const posts = yield call(Blog.getPostByCategory, action.payload);   
    yield put(receivePosts(posts));
  }
}


export default function* blogSaga() {
  yield fork(requestCategories);
  yield fork(requestPosts);
}