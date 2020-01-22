import { createAction, handleActions, combineActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 초기상태
const defaultState = Map({
  isFetching: false,
  didInvalidate: false,
  posts: List([
    Map({
      id: '',
      filename: '',
      title: '',
      date: null,
      tags: List([
        Map({
          name: ''
        })
      ]),
      categories: List([
        Map({
          name: ''
        })
      ]),
      body: '',
      updatedAt: null
    })
  ])
});

/*********액션**********/
// 동기 액션
export const REQUEST_POSTS = 'blog/REQUEST_POSTS';
export const RECEIVE_POSTS = 'blog/RECEIVE_POSTS';

// 비동기 액션
export const FETCH_POSTS_REQUEST = 'blog/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'blog/FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'blog/FETCH_POSTS_SUCCESS';
/***********************/

/*********액션 생성자**********/
// 동기 액션 생성자
/**
 * 1) requestPosts
 * {
 *    type: 'REQUEST_POSTS',
 *    payload: {
 *      blog
 *    }
 * }
 * 
 * 2) receivePosts
 * {
 *    type: 'REQUEST_POSTS',
 *    payload: {
 *      blog,
 *      posts: json.data.children.map(child => child.data),
 *      receivedAt: Data.now()
 *    }
 * }
 */
export const requestPosts = createAction(REQUEST_POSTS);
export const receivePosts = createAction(RECEIVE_POSTS);
// 비동기 액션 생성자
/**
 * 1) fetchPostsRequest
 * {
 *    type: 'FETCH_POSTS_REQUEST',
 *    payload: {
 *      
 *    }
 * }
 * 
 * 2) fetchPostsFailure
 * {
 *    type: 'FETCH_POSTS_FAILURE',
 *    payload: {
 *      error: 'Oops' 
 *    }
 * }
 * 3) fetchPostsSuccess
 * {
 *    type: 'FETCH_POSTS_SUCCESS',
 *    payload: {
 *      response: {....}
 *    }
 * }
 */
export const fetchPostsRequest = createAction(FETCH_POSTS_REQUEST);
export const fetchPostsFailure = createAction(FETCH_POSTS_FAILURE);
export const fetchPostsSuccess = createAction(FETCH_POSTS_SUCCESS);
/***********************/

// 리듀서
export default handleActions(
  {
    [REQUEST_POSTS]: (state, action) => {
      return state.set('isFetching', true);
    },
    [RECEIVE_POSTS]: (state, action) => {
      return state.set('posts', List(action.payload));
    }
  },
  defaultState
);