import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, changeInfo, changePass } from "../../redux/actions/authActions.js";
import classnames from "classnames";
import './notifications.css';

class ChangeInfo extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.name,
      email: localStorage.email,
      oldpassword: "",
      newpassword: "",
      newpassword2: "",
      address: localStorage.address,
      number: localStorage.number,
      userID: localStorage.userID,
      errors: {}
    };
  }

componentDidMount() {
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
const newUser = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      number: this.state.number,
      userID: this.state.userID
    };
this.props.changeInfo(newUser, this.props.history);
};
onSubmit2 = e => {
e.preventDefault();
const newUser = {
    oldpassword: this.state.oldpassword,
    newpassword: this.state.newpassword,
    newpassword2: this.state.newpassword2,
    userID: this.state.userID
};
this.props.changePass(newUser, this.props.history); 
};
render() {
    const { errors } = this.state;
return (

    <div>
        <div className="container">
        <div className="row">
            <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link> 
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Change User Information</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit1}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div> 
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.number}
                  error={errors.number}
                  id="number"
                  type="number"
                  className={classnames("", {
                    invalid: errors.number
                  })}
                />
                <label htmlFor="number">Number (923...)</label>
                <span className="red-text">{errors.number}</span>
              </div>
              <div class="input-field col s12">
                <select class="browser-default" 
                  onChange={this.onChange}
                  value={this.state.address}
                  error={errors.address}
                  id="address"
                  type="address"
                >
                  <option value="" disabled selected>Choose your option</option>
                  <option value="F1">F1</option>
                  <option value="F2">F2</option>
                  <option value="F3">F3</option>
                  <option value="F4">F4</option>
                  <option value="F5">F5</option>
                  <option value="M1">M1</option>
                  <option value="M2">M2</option>
                  <option value="M3">M3</option>
                  <option value="M4">M4</option>
                  <option value="M5">M5</option>
                  <option value="M6">M6</option>
                  <option value="M7">M7</option>
                </select>
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
                  Change Information
                </button>
              </div>
              </form>
            </div>
            </div>
        </div>

        <div className="container">
        <div className="row">
            <div className="col s8 offset-s2">
            <form noValidate onSubmit={this.onSubmit2}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.oldpassword}
                  error={errors.oldpassword}
                  id="oldpassword"
                  type="password"
                  className={classnames("", {
                    invalid: errors.oldpassword
                  })}
                />
                <label htmlFor="oldpassword">Old Password</label>
                <span className="red-text">{errors.oldpassword}</span>
              </div>
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
ChangeInfo.propTypes = {
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
)(withRouter(ChangeInfo));