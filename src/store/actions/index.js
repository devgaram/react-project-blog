import { createAction } from "redux-actions";

/*
   블로그 관련 액션
*/
export const INIT_POST = "blog/INIT_POST";
export const CHANGE_POST_CONTENT = "blog/CHANGE_POST_CONTENT";
export const REQUEST_UPDATE_FILE = "blog/REQUEST_UPDATE_FILE";
export const FAILURE_UPDATE_FILE = "blog/FAILURE_UPDATE_FILE";
export const SUCCESS_UPDATE_FILE = "blog/SUCCESS_UPDATE_FILE";
export const REQUEST_CREATE_FILE = "blog/REQUEST_CREATE_FILE";
export const FAILURE_CREATE_FILE = "blog/FAILURE_CREATE_FILE";
export const SUCCESS_CREATE_FILE = "blog/SUCCESS_CREATE_FILE";
export const REQUEST_DELETE_FILE = "blog/REQUEST_DELETE_FILE";
export const FAILURE_DELETE_FILE = "blog/FAILURE_DELETE_FILE";
export const SUCCESS_DELETE_FILE = "blog/SUCCESS_DELETE_FILE";
/*
   블로그 관련 액션 생성자
*/
export const initPost = createAction(INIT_POST);
export const changePostContent = createAction(CHANGE_POST_CONTENT);
export const requestUpdateFile = createAction(REQUEST_UPDATE_FILE);
export const failureUpdateFile = createAction(FAILURE_UPDATE_FILE);
export const successUpdateFile = createAction(SUCCESS_UPDATE_FILE);
export const requestCreateFile = createAction(REQUEST_CREATE_FILE);
export const failureCreateFile = createAction(FAILURE_CREATE_FILE);
export const successCreateFile = createAction(SUCCESS_CREATE_FILE);
export const requestDeleteFile = createAction(REQUEST_DELETE_FILE);
export const failureDeleteFile = createAction(FAILURE_DELETE_FILE);
export const successDeleteFile = createAction(SUCCESS_DELETE_FILE);
