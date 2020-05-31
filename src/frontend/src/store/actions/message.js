import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

export const addMessage = (message) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message,
  };
};

export const setMessages = (messages) => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages,
  };
};

const removeUserFromArray = (arr, username) => {
  // arr: ['admin', 'guest']
  // username: guest
  // => ['admin']
  // FIX ME: assumes only 2 participants
  // make a copy of the array otherwise the splice method
  // modifies the global array
  let returnValue = [...arr];
  for (var i = 0; i < returnValue.length; i++) {
    if (returnValue[i].username === username) {
      returnValue.splice(i, 1);
    }
  }
  return returnValue[0];
};

const getUserChatsSuccess = (chats) => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats,
  };
};

const getUserParticipantsSuccess = (username, participants) => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    guest: removeUserFromArray(participants, "hugo"),
    admin: removeUserFromArray(participants, username),
  };
};
export const getUserChats = (username, token = "") => {
  return (dispatch) => {
    if (username) {
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      if (token.length > 0) {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        };
      } else {
        axios.defaults.headers = {
          "Content-Type": "application/json",
        };
      }
      axios.get(`${HOST_URL}/chat/?username=${username}`).then((res) => {
        dispatch(getUserChatsSuccess(res.data));
        res.data.forEach((chat) => {
          dispatch(getUserParticipantsSuccess(username, chat.participants));
        });
      });
    } else {
      console.log("username cannot be null or undefined");
    }
  };
};
