import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions.js";
import classnames from "classnames";
import localStorage from "redux-persist/es/storage";
import Button from 'react-bootstrap/Button'
import './Register.styles.scss';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      address: "",
      number: "",
      userID: '_' + Math.random().toString(36).substr(2, 9),
      question: "",
      answer: "",
      errors: {}
    };
  }

componentDidMount() {
  // If logged in and user navigates to Register page, should redirect them to dashboard
  if (localStorage.email) {
    this.props.history.push("/");
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
onSubmit = e => {
  e.preventDefault();
  const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        address: this.state.address,
        number: this.state.number,
        userID: this.state.userID,
        question: this.state.question,
        answer: this.state.answer
      };
this.props.registerUser(newUser, this.props.history); 
};

render() {
    const { errors } = this.state;
return (
      <div className = 'check'>
        <div className="container">
          <div className="row">
            {/* <div className="col s8 offset-s2"> */}
            <div className="col s8">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left" color="F8A22F">keyboard_backspace</i> Back to
                home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link class="colorc" to="/login">Log in</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
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
                <div class="input-field col s12">
                  <select class="browser-default" 
                    onChange={this.onChange}
                    value={this.state.address}
                    error={errors.address}
                    id="address"
                    type="address"
                  >
                    <option value="" disabled selected>Address</option>
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
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
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
                    value={this.state.question}
                    error={errors.question}
                    id="question"
                    type="question"
                  >
                    <option value="" disabled selected>Choose your secret question</option>
                    <option value="What is my hometown?">What is my hometown?</option>
                    <option value="What is my nickname?">What is my nickname? </option>
                    <option value="What is my grandfather's name?">What is my grandfather's name?</option>
                    <option value="What is my pet's name?">What is my pet's name?</option>
                  </select>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.answer}
                    error={errors.answer}
                    id="answer"
                    type="text"
                    className={classnames("", {
                      invalid: errors.answer
                    })}
                  />
                  <label htmlFor="answer">Answer to secret question</label>
                  <span className="red-text">{errors.answer}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <Button variant="primary" type="submit" block>
                    Register
                  </Button>
                  
                  {/* <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));