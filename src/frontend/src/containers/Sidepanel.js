import React from "react";
import { Spin, Icon } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";
import Contact from "../components/Contact";
import { BASE_URL } from "../settings";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Sidepanel extends React.Component {
  state = {
    loginForm: true,
    username: null,
    chats: [],
  };

  waitForAuthDetails = () => {
    if (this.props.token !== null && this.props.token !== undefined) {
      this.props.getUserChats(this.props.username, this.props.token);
    } else if (this.props.username !== undefined) {
      this.props.getUserChats(this.props.username);
    }
  };

  componentDidUpdate() {
    if (!this.state.username) {
      this.waitForAuthDetails();
      this.setState((prevState) => {
        return {
          ...prevState,
          username: this.props.username,
        };
      });
    }
    if (this.state.chats.length == 0 && this.props.chats.length > 0) {
      this.setState((prevState) => {
        return {
          ...prevState,
          chats: this.props.chats,
        };
      });
    }
  }

  openAddChatPopup() {
    this.props.addChat();
  }

  renderChats = (chats) => {
    let returnList = [];
    chats.forEach((chat) => {
      returnList.push(
        <Contact
          key={this.props.admin.id}
          name={this.props.admin.fullname}
          picURL={`${BASE_URL}${this.props.admin.image_url}`}
          status="away"
          chatURL={`/${chat.id}`}
        />
      );
    });
    console.log(`${returnList.length} chat(s) were found`);
    return returnList;
  };
  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  authenticate = (e) => {
    e.preventDefault();
    if (this.state.loginForm) {
      this.props.login(e.target.username.value, e.target.password.value);
    } else {
      this.props.signup(
        e.target.username.value,
        e.target.email.value,
        e.target.password.value,
        e.target.password2.value
      );
    }
  };

  render() {
    return (
      <div id="sidepanel">
        <div id="profile">
          {this.props.guest && this.props.admin && (
            <div className="wrap">
              {this.props.username == "hugo" ? (
                <React.Fragment>
                  <img
                    id="profile-img"
                    src={`${BASE_URL}${this.props.admin.image_url}`}
                    className="online"
                    alt="profile-pic"
                  />

                  <p>{this.props.admin.fullname}</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <img
                    id="profile-img"
                    src={`${BASE_URL}${this.props.guest.image_url}`}
                    className="online"
                    alt="profile-pic"
                  />

                  <p>{this.props.guest.fullname}</p>
                </React.Fragment>
              )}

              <i
                className="fa fa-chevron-down expand-button"
                aria-hidden="true"
              />
              <div id="status-options">
                <ul>
                  <li id="status-online" className="active">
                    <span className="status-circle" /> <p>Online</p>
                  </li>
                  <li id="status-away">
                    <span className="status-circle" /> <p>Away</p>
                  </li>
                  <li id="status-busy">
                    <span className="status-circle" /> <p>Busy</p>
                  </li>
                  <li id="status-offline">
                    <span className="status-circle" /> <p>Offline</p>
                  </li>
                </ul>
              </div>
              <div id="expanded">
                {this.props.loading ? (
                  <Spin indicator={antIcon} />
                ) : this.props.isAuthenticated ? (
                  <button
                    onClick={() => this.props.logout()}
                    className="authBtn"
                  >
                    <span>Logout</span>
                  </button>
                ) : (
                  <div>
                    <form method="POST" onSubmit={this.authenticate}>
                      {this.state.loginForm ? (
                        <div>
                          <input
                            name="username"
                            type="text"
                            placeholder="username"
                          />
                          <input
                            name="password"
                            type="password"
                            placeholder="password"
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            name="username"
                            type="text"
                            placeholder="username"
                          />
                          <input
                            name="email"
                            type="email"
                            placeholder="email"
                          />
                          <input
                            name="password"
                            type="password"
                            placeholder="password"
                          />
                          <input
                            name="password2"
                            type="password"
                            placeholder="password confirm"
                          />
                        </div>
                      )}

                      <button type="submit">Authenticate</button>
                    </form>

                    <button onClick={this.changeForm}>Switch</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true" />
          </label>
          <input type="text" placeholder="Search Chats..." />
        </div>
        <div id="contacts">
          <ul>
            {this.props.admin &&
              this.state.chats.length > 0 &&
              this.renderChats(this.state.chats)}
          </ul>
        </div>
        <div id="bottom-bar">
          <button id="addChat" onClick={() => this.openAddChatPopup()}>
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span>Create chat</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null || state.auth.username !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats,
    guest: state.message.guest,
    admin: state.message.admin,
    messages: state.message.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userName, password) =>
      dispatch(actions.authLogin(userName, password)),
    logout: () => dispatch(actions.logout()),
    signup: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
