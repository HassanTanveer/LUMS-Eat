import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { Link } from 'react-router-dom';
import './logout.styles.scss';
import { withRouter } from 'react-router-dom';


class Logout extends Component {  


  

  // constructor() {
  //   super();
     
    
  // } 
  

  updateSearch(event) {
    this.setState({search: event.target.value})
  }

 

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    //console.log(`{this.props.location.pathname}`)
    //this.props.history.push(`{this.props.location.pathname}`);
    this.props.history.push('/');
 
  };



  render() {
   
    return (
      <Link className='option'   onClick = {this.onLogoutClick } >
      LOGOUT
    </Link>
    )
      
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(
  mapStateToProps,
  { logoutUser }
)(Logout));

