import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";
import Hoc from "../hoc/hoc";
import { BASE_URL } from "../settings";

class Chat extends React.Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.chatID
      );
    });
    WebSocketInstance.connect(this.props.match.params.chatID);
  }

  constructor(props) {
    super(props);

    this.initialiseChat();
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  messageChangeHandler = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.match.params.chatID,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderTimestamp = (timestamp) => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  renderMessages = (messages) => {
    const currentUser = this.props.username;
    console.log("currentUser", currentUser);
    console.log("this.props.admin", this.props.admin);
    messages.forEach((message) => {
      console.log("message", message);
    });
    return messages.map((message, i, arr) => (
      <li
        key={message.id}
        style={{ marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
        className={message.author === currentUser ? "sent" : "replies"}
      >
        {message.author === "hugo" ? (
          <React.Fragment>
            <img
              id="profile-img"
              src={`${BASE_URL}${this.props.admin.image_url}`}
              alt="profile-pic-admin"
            />

            <p>
              {message.content}
              <br />
              <small>{this.renderTimestamp(message.timestamp)}</small>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img
              id="profile-img"
              src={`${BASE_URL}${this.props.image_url}`}
              alt="profile-pic"
            />

            <p>
              {message.content}
              <br />
              <small>{this.renderTimestamp(message.timestamp)}</small>
            </p>
          </React.Fragment>
        )}
      </li>
    ));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.chatID !== newProps.match.params.chatID) {
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          this.props.username,
          newProps.match.params.chatID
        );
      });
      WebSocketInstance.connect(newProps.match.params.chatID);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="messages">
          <ul id="chat-log">
            {this.props.messages &&
              this.props.admin &&
              this.props.guest &&
              this.renderMessages(this.props.messages)}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                this.messagesEnd = el;
              }}
            />
          </ul>
        </div>
        <div className="message-input">
          <form onSubmit={this.sendMessageHandler}>
            <div className="wrap">
              <input
                onChange={this.messageChangeHandler}
                value={this.state.message}
                required
                id="chat-message-input"
                type="text"
                placeholder="Write your message..."
              />
              <i className="fa fa-paperclip attachment" aria-hidden="true" />
              <button id="chat-message-submit" className="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    image_url: state.auth.image_url,
    pic: state.auth.pic,
    messages: state.message.messages,
    chats: state.message.chats,
    guest: state.message.guest,
    admin: state.message.admin,
  };
};

export default connect(mapStateToProps)(Chat);
