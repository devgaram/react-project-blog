import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { Map } from "immutable";
import {
  INIT_POST,
  CHANGE_POST_CONTENT,
  REQUEST_UPDATE_FILE,
  FAILURE_UPDATE_FILE,
  SUCCESS_UPDATE_FILE,
  REQUEST_CREATE_FILE,
  FAILURE_CREATE_FILE,
  SUCCESS_CREATE_FILE,
  REQUEST_DELETE_FILE,
  FAILURE_DELETE_FILE,
  SUCCESS_DELETE_FILE
} from "store/actions";

const defaultState = Map({
  post: Map({
    category: "",
    sha: "",
    name: "",
    content: ""
  })
});

// selectors
export const getPostContent = state =>
  state.blog.postReducer.getIn(["post", "content"]);

// reducers
const postReducer = handleActions(
  {
    [INIT_POST]: (state, action) => {
      const { category, sha, name, content } = action.payload;
      return state
        .setIn(["post", "category"], category)
        .setIn(["post", "sha"], sha)
        .setIn(["post", "name"], name)
        .setIn(["post", "content"], content);
    },
    [CHANGE_POST_CONTENT]: (state, action) => {
      const { postContent } = action.payload;
      return state.setIn(["post", "content"], postContent);
    }
  },
  defaultState
);

const updateReducer = handleActions(
  {
    [REQUEST_UPDATE_FILE]: (state, action) => {
      action.payload = {
        category: state.getIn(["post", "category"]),
        sha: state.getIn(["post", "sha"]),
        name: state.getIn(["post", "name"]),
        content: state.getIn(["post", "content"])
      };
      return state;
    },
    [FAILURE_UPDATE_FILE]: (state, action) => {
      return state;
    },
    [SUCCESS_UPDATE_FILE]: (state, action) => {
      return state;
    }
  },
  defaultState
);

const createReducer = handleActions(
  {
    [REQUEST_CREATE_FILE]: (state, action) => {
      action.payload = {
        category: state.getIn(["post", "category"]),
        sha: state.getIn(["post", "sha"]),
        name: state.getIn(["post", "name"]),
        content: state.getIn(["post", "content"])
      };
      return state;
    },
    [FAILURE_CREATE_FILE]: (state, action) => {
      return state;
    },
    [SUCCESS_CREATE_FILE]: (state, action) => {
      return state;
    }
  },
  defaultState
);

const deleteReducer = handleActions(
  {
    [REQUEST_DELETE_FILE]: (state, action) => {
      action.payload = {
        category: state.getIn(["post", "category"]),
        sha: state.getIn(["post", "sha"]),
        name: state.getIn(["post", "name"]),
        content: state.getIn(["post", "content"])
      };
      return state;
    },
    [FAILURE_DELETE_FILE]: (state, action) => {
      return state;
    },
    [SUCCESS_DELETE_FILE]: (state, action) => {
      return state;
    }
  },
  defaultState
);

export default combineReducers({
  postReducer,
  updateReducer,
  createReducer,
  deleteReducer
});
