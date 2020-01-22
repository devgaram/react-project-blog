import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 초기상태
const defaultState = Map({
  isFetching: false,
  userid: '',
  password: '',
  token: '',
  logged: false,
  showMessage: false,
  resMessage: '',
  loginModalVisible: false,
});

/** request_login -> isfetching -> api통신 -> */
/*********액션**********/
// payload.userid, payload.password
export const REQUEST_LOGIN = 'auth/REQUEST_LOGIN';
export const FAILURE_LOGIN = 'auth/FAILURE_LOGIN';
export const SUCCESS_LOGIN = 'auth/SUCCESS_LOGIN';

// 로그아웃 : 쿠키삭제, 서버의 refresh토큰 삭제.. 
export const REQUEST_LOGOUT = 'auth/REQUEST_LOGOUT';
export const FAILURE_LOGOUT = 'auth/FAILURE_LOGOUT';
export const SUCCESS_LOGOUT = 'auth/SUCCESS_LOGOUT';

export const REQUEST_LOGINCHECK = 'auth/REQUEST_LOGINCHECK';
export const AFTER_LOGINCHECK = 'auth/AFTER_LOGINCHECK';

export const CHANGE_INPUT = 'auth/CHANGE_INPUT';
export const LOGIN_MODAL_VISIBLE = 'auth/LOGIN_MODAL_VISIBLE';
/***********************/

/*******액션 생성자******/
export const requestLogin = createAction(REQUEST_LOGIN);
export const failureLogin = createAction(FAILURE_LOGIN);
export const successLogin = createAction(SUCCESS_LOGIN);

export const requestLoginCheck = createAction(REQUEST_LOGINCHECK);
export const afterLoginCheck = createAction(AFTER_LOGINCHECK);

export const requestLogout = createAction(REQUEST_LOGOUT);

export const changeInput = createAction(CHANGE_INPUT);
export const loginModalVisible = createAction(LOGIN_MODAL_VISIBLE)
/***********************/

// 리듀서
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { userid, password } = action.payload;
      if (userid != null) state = state.set('userid', userid)
      if (password != null) state = state.set('password', password);
      return state;
    },
    [REQUEST_LOGIN]: (state, action) => {
      return state.set('isFetching', true).set('showMessage', false);
    },
    [FAILURE_LOGIN]: (state, action) => {
      let message = action.payload;
      return state.set('isFetching', false)
              .set('resMessage', message)
              .set('showMessage', true);
    },
    [SUCCESS_LOGIN]: (state, action) => {
      let { message, accessToken } = action.payload;
      return state.set('isFetching', false)
              .set('resMessage', message)
              .set('logged', true)
              .set('loginModalVisible', false)
              .set('showMessage', true)
              .set('token', accessToken);
    },
    [LOGIN_MODAL_VISIBLE]: (state, action) => {
      if (!action.payload) state = state.set('showMessage', false);
      return state.set('loginModalVisible', action.payload);
    },
    [REQUEST_LOGINCHECK]: (state, action) => {
      return state;
    },
    [AFTER_LOGINCHECK]: (state, action) => {
      return state.set('logged', action.payload);
    },
    [REQUEST_LOGOUT]: (state, action) => {
      return state.set('logged', false);
    }
  },
  defaultState
);