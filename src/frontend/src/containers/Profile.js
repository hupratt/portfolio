import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Hoc from "../hoc/hoc";
import { BASE_URL } from "../settings";

class Profile extends React.Component {
  render() {
    // if (this.props.token === null) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="contact-profile">
        <div className="social-media">
          <i className="fa fa-facebook" aria-hidden="true" />
          <i className="fa fa-twitter" aria-hidden="true" />
          <i className="fa fa-instagram" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    token: state.auth.token,
    guest: state.message.guest,
    admin: state.message.admin,
  };
};

export default connect(mapStateToProps)(Profile);
