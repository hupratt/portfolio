import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Hoc from "../hoc/hoc";
import { BASE_URL } from "../settings";

class Profile extends React.Component {
  render() {
    if (this.props.token === null) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        {this.props.guest && this.props.admin && (
          <div className="contact-profile">
            {this.props.guest.username == "hugo" ? (
              <React.Fragment>
                <img src={`${BASE_URL}${this.props.admin.image_url}`} alt="" />

                <p>{this.props.admin.fullname}</p>
                <div className="social-media">
                  <i className="fa fa-facebook" aria-hidden="true" />
                  <i className="fa fa-twitter" aria-hidden="true" />
                  <i className="fa fa-instagram" aria-hidden="true" />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img src={`${BASE_URL}${this.props.guest.image_url}`} alt="" />

                <p>{this.props.guest.fullname}</p>
                <div className="social-media">
                  <i className="fa fa-facebook" aria-hidden="true" />
                  <i className="fa fa-twitter" aria-hidden="true" />
                  <i className="fa fa-instagram" aria-hidden="true" />
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
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
