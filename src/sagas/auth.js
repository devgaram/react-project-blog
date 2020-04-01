import { take, call, put, fork, takeEvery } from "redux-saga/effects";
import { Auth } from "api";
import {
  REQUEST_SIGN_IN,
  FAILURE_SIGN_IN,
  SUCCESS_SIGN_IN
} from "store/actions/auth";

// 로그인
export function* requestSignIn() {
  while (true) {
    let { payload } = yield take(REQUEST_SIGN_IN);
    const response = yield call(Auth.signIn, payload);
    if (response.status !== 200) {
      yield put({
        type: FAILURE_SIGN_IN,
        payload: response
      });
      continue;
    }
    yield put({ type: SUCCESS_SIGN_IN, payload: response });

    // Cookies.set("accessToken", response.accessToken, {
    //   //httpOnly: true, // --> localhost 사용불가...
    //   expires: new Date(Date.now() + 3600000) // 1시간
    // });
  }
}

export default function* authSaga() {
  yield fork(requestSignIn);
}
