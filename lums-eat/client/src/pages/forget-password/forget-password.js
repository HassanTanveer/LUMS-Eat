import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, changeInfo, changePass } from "../../redux/actions/authActions.js";
import classnames from "classnames";
import axios from "axios";


class ForgetPass extends Component {
  constructor() {
    super();
    this.state = {
      email: localStorage.changeemail,
      newpassword: "",
      newpassword2: "",
      errors: {}
    };
  }

componentDidMount() {
// If logged in and user navigates to Register page, should redirect them to dashboard
    if (localStorage.email) {
        window.location.href = '/login'
    }
    if (!localStorage.changeemail) {
        window.location.href = '/login'
    }
}
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
}
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit1 = e => {
    e.preventDefault();
    const newpass = {
        email: this.state.email,
        newpassword: this.state.newpassword,
        newpassword2: this.state.newpassword2,
    };
    axios
        .post("/users/changepass", newpass)
            .then(res => {
                console.log(res.data)
                if(res.data === "Success"){
                    window.location.href = '/login'
                }
                else{
                    let errors = res.data
                    this.setState({errors})
                }
            })
            .catch(errors => console.log(errors))
    localStorage.removeItem("changeemail") 
};

render() {
    const { errors } = this.state;
return (

    <div>
        <div className="container">
        <div className="row">
            <div className="col s8 offset-s2">
            <Link to="/login" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
                login
            </Link> 
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Chose a new password</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit1}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.newpassword}
                  error={errors.newpassword}
                  id="newpassword"
                  type="password"
                  className={classnames("", {
                    invalid: errors.newpassword
                  })}
                />
                <label htmlFor="newpassword">New Password</label>
                <span className="red-text">{errors.newpassword}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.newpassword2}
                  error={errors.newpassword2}
                  id="newpassword2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.newpassword2
                  })}
                />
                <label htmlFor="newpassword2">Confirm New Password</label>
                <span className="red-text">{errors.newpassword2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
ForgetPass.propTypes = {
  registerUser: PropTypes.func.isRequired,
  changeInfo: PropTypes.func.isRequired,
  changePass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser, changeInfo, changePass }
)(withRouter(ForgetPass));