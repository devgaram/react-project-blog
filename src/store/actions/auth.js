import { createAction, createActions } from "redux-actions";

/**
 * 인증 관련 액션
 */
export const CHANGE_INPUT = "auth/CHANGE_INPUT";
export const REQUEST_SIGN_UP = "auth/REQUEST_SIGN_UP";
export const FAILURE_SIGN_UP = "auth/FAILURE_SIGN_UP";
export const SUCCESS_SIGN_UP = "auth/SUCCESS_SIGN_UP";
export const REQUEST_SIGN_IN = "auth/REQUEST_SIGN_IN";
export const FAILURE_SIGN_IN = "auth/FAILURE_SIGN_IN";
export const SUCCESS_SIGN_IN = "auth/SUCCESS_SIGN_IN";
export const REQUEST_SIGN_OUT = "auth/REQUEST_SIGN_OUT";
export const FAILURE_SIGN_OUT = "auth/FAILURE_SIGN_OUT";
export const SUCCESS_SIGN_OUT = "auth/SUCCESS_SIGN_OUT";
/**
 * 인증 관련 액션 생성자
 */
export const changeInput = createAction(
  CHANGE_INPUT,
  ({ userid, password }) => ({
    userid,
    password
  })
);
export const requestSignIn = createAction(
  REQUEST_SIGN_IN,
  ({ userid, password }) => ({
    userid,
    password
  })
);
export const failureSignIn = createAction(FAILURE_SIGN_IN, error => error);
export const successSignIn = createAction(SUCCESS_SIGN_IN, error => error);

export const { requestSignUp, failureSignUp, successSignUp } = createActions({
  REQUEST_SIGN_UP: ({ userid, password }) => ({ userid, password }),
  FAILURE_SIGN_UP: response => response,
  SUCCESS_SIGN_UP: error => error
});
// export const { failureSignIn, successSignIn } = createActions({
//   //REQUEST_SIGN_IN: ({ userid, password }) => ({ userid, password }),
//   FAILURE_SIGN_IN: response => response,
//   SUCCESS_SIGN_IN: error => error
// });
export const { requestSignOut, failureSignOut, successSignOut } = createActions(
  {
    REQUEST_SIGN_OUT: ({ userid, password }) => ({ userid, password }),
    FAILURE_SIGN_OUT: response => response,
    SUCCESS_SIGN_OUT: error => error
  }
);
