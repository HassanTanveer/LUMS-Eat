import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { Link } from 'react-router-dom';
import './logout.styles.scss';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  selectCartItems

} from '../../redux/cart/cart.selectors';

import {
  clearItemFromCart
  
} from '../../redux/cart/cart.actions';



class Logout extends Component {  


  

  

  updateSearch(event) {
    this.setState({search: event.target.value})
  }

 

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.cartItems.map(item => (
      this.props.clearItem(item)
      ))

  
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
  auth: PropTypes.object.isRequired,

};


const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
  
  
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  clearItem : item => dispatch(clearItemFromCart(item))
});



export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
  
  
)(Logout));

