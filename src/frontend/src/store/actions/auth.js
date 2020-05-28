import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username
  };
};

export const authSessionSuccess = (username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    username: username
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .post(`${process.env.HOST_URL}/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(username, token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${process.env.HOST_URL}/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(username, token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(username, token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 100000
          )
        );
      }
    }
  };
};

export const checkLoggedInSession = () => {
  return dispatch => {
    // FIX ME: rest-auth returns html??? 
    axios
      .get(`${process.env.HOST_URL}/chat/auth/user/`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
      .then(res => {
        // const expirationDate = new Date(new Date().getTime() + 3600 * 100000);
        // localStorage.setItem("token", res.data.token);
        // localStorage.setItem("expirationDate", expirationDate);
        console.log('res.data.user_name', res.data.user_name);
        localStorage.setItem("username", res.data.user_name);
        dispatch(authSessionSuccess(res.data.user_name));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
}};