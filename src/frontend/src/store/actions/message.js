import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

export const addMessage = message => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message
  };
};

export const setMessages = messages => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages
  };
};

const getUserChatsSuccess = chats => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats: chats
  };
};

export const getUserChats = (username, token='') => {
  return dispatch => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    if (token.length>0){
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
    } else {
      axios.defaults.headers = {
        "Content-Type": "application/json",
      };
    }
    axios
      .get(`${HOST_URL}/chat/?username=${username}`)
      .then(res => dispatch(getUserChatsSuccess(res.data)));
  };
};
