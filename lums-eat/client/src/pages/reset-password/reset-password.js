import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, changeInfo, changePass } from "../../redux/actions/authActions.js";
import classnames from "classnames";
import axios from "axios";
import "./reset.css"


class ResetPass extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      secretquestion: "",
      answer: "",
      errors: {}
    };
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
    const answer = {
        email: this.state.email,
        answer: this.state.answer
    };
    console.log(answer)
    axios
    .post("/users/checkanswer", answer)
        .then(res => {
            if(res.data === "Correct"){
                window.location.href = '/forget-pass'
            }
            else{
                this.setState({errors: {
                    "answer": "Wrong answer"
                }})
            }
        })
        .catch(err => console.log(err))
    localStorage.setItem("changeemail", this.state.email)
};

onSubmit1 = e => {
    e.preventDefault();

    console.log(this.state.email)
    axios
    .get(`/users/security/${this.state.email}`)
      .then(res => {
          if(res.data.Errors){
              let errors = res.data.Errors
              this.setState({errors})
          }else
          {
          console.log(res.data)
          let secretquestion = res.data
          this.setState({secretquestion})
        }
        })
        let x = document.getElementById("myDIV");
        x.style.display = "none";
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
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
                <b>Forgot your password?</b> Enter you email below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit1}>
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
                <label htmlFor="email">email</label>
                <span className="red-text">{errors.email}</span>
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
                  Proceed
                </button>
              </div>
              </form>
          </div>
        </div>
    </div>

    <div className="container" id = "myDIV">
        <div className="row">
            <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Answer the security question</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div style={{ paddingLeft: "11.250px", paddingTop: "5px", fontSize: 20 }}>
                  {this.state.secretquestion}
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
                <label htmlFor="text">Answer</label>
                <span className="red-text">{errors.answer}</span>
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
                  Proceed
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
ResetPass.propTypes = {
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
)(withRouter(ResetPass));  