import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  username: null,
  error: null,
  loading: false,
  pic: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    username: action.username,
    error: null,
    loading: false,
  });
};

const picSuccess = (state, action) => {
  return updateObject(state, {
    pic: action.pic,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.GRAB_PICTURE_SUCCESS:
      return picSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
