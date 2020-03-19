import { take, call, put, fork, takeEvery } from "redux-saga/effects";
import { Auth } from "lib/api";
import {
  REQUEST_LOGIN,
  REQUEST_LOGINCHECK,
  REQUEST_LOGOUT,
  FAILURE_LOGIN,
  SUCCESS_LOGIN,
  AFTER_LOGINCHECK
} from "store/modules/auth";
import Cookies from "js-cookie";

// 로그인
export function* requestLogin() {
  while (true) {
    let { payload } = yield take(REQUEST_LOGIN); // 로그인 기다리기
    const { result, error } = yield call(
      Auth.login,
      payload.userid,
      payload.password
    ); // 서버에 로그인 요청
    // 로그인 에러 발생
    if (error != null) {
      if (error.response.data != null) {
        yield put({
          type: FAILURE_LOGIN,
          payload: error.response.data.message
        });
      } else {
        yield put({
          type: FAILURE_LOGIN,
          payload: "서버 에러로 로그인 실패했습니다."
        });
      }
      continue;
    }

    // 로그인 성공
    // 쿠키 셋 -> 위치가 여기가 적절한 지.. 고민해보기
    Cookies.set("accessToken", result.accessToken, {
      //httpOnly: true, // --> localhost 사용불가...
      expires: new Date(Date.now() + 3600000) // 1시간
    });
    yield put({ type: SUCCESS_LOGIN, payload: result });
  }
}

export function* requestloggedCheck() {
  while (true) {
    // 현재 로그인된 상태인지 확인.
    yield take(REQUEST_LOGINCHECK);
    let payload = false;
    if (Cookies.get("accessToken") != null) payload = true;

    yield put({ type: AFTER_LOGINCHECK, payload });
  }
}

export function* requestLogout() {
  // 로그아웃 기다리기
  yield take(REQUEST_LOGOUT);
  Cookies.remove("accessToken");
  yield call(Auth.logout, Cookies.get("accessToken"));
}

export default function* authSaga() {
  yield fork(requestLogin);
  yield fork(requestLogout);
  yield fork(requestloggedCheck);
}
