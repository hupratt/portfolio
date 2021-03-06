import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";
import { getUserChats } from "./message";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
  };
};

const authSessionSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user_name: data.user_name,
    user_staff: data.user_staff,
    userID: data.userID,
    email: data.email,
  };
};
const serializePic = (data) => {
  return {
    type: actionTypes.AUTH_PICTURE,
    image_url: data.image_url,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const grabPicFail = (error) => {
  return {
    type: actionTypes.GRAB_PICTURE_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios
      .post(`${HOST_URL}/rest-auth/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(username, token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${HOST_URL}/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(username, token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
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

export const grabPicture = (userid) => {
  return (dispatch) => {
    axios
      .get(`${HOST_URL}/chat/contact/${userid}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(grabPictureSuccess(res.data.image_url));
      })
      .catch((err) => {
        dispatch(grabPicFail(err));
      });
  };
};

export const checkLoggedInSession = () => {
  return (dispatch) => {
    // FIX ME: rest-auth returns html???
    axios
      .get(`${HOST_URL}/chat/auth/user/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(authSessionSuccess(res.data));
        dispatch(checkAuthTimeout(3600));
        return res.data.userID;
      })
      .then((res) => {
        axios.get(`${HOST_URL}/chat/contact/${res}/`).then((res) => {
          dispatch(serializePic(res.data));
        });
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
