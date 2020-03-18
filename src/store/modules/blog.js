import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

const defaultState = Map({
  pagination: 10,
  postCount: 0,
  categories: List([]),
  posts: List([
    Map({
      name: '',
      html_url: ''
    })
  ])
});

// 페이지네이션 액션 & 액션 생성자
export const NEXT_PAGE = 'blog/NEXT_PAGE';
export const nextPage = createAction(NEXT_PAGE);

// 카테고리 액션 & 액션 생성자
export const REQUEST_CATEGORIES = 'blog/REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'blog/RECEIVE_CATEGORIES';
export const requestCategories = createAction(REQUEST_CATEGORIES);
export const receiveCategories = createAction(RECEIVE_CATEGORIES);

// 포스트 액션 & 액션 생성자
export const REQUEST_POSTS = 'blog/REQUEST_POSTS';
export const RECEIVE_POSTS = 'blog/RECEIVE_POSTS';
export const requestPosts = createAction(REQUEST_POSTS);
export const receivePosts = createAction(RECEIVE_POSTS);

export default handleActions(
  {
    [NEXT_PAGE]: (state, action) => {
      return state.set('pagination', state.get('pagination') + 10);
    },
    [REQUEST_CATEGORIES]: (state, action) => {
      return state;
    },
    [RECEIVE_CATEGORIES]: (state, action) => {
      return state.set('categories', List(action.payload));
    },
    [REQUEST_POSTS]: (state, action) => {
      return state;
    },
    [RECEIVE_POSTS]: (state, action) => {
      return state.set('posts', List(action.payload));
    },
  },
  defaultState
);