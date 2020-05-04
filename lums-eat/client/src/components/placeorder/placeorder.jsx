import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
// import { createStructuredSelector } from 'reselect';
// import {
    // selectCartItems,
    // selectCartTotal
//   } from '../../redux/cart/cart.selectors';

  // import store from '../../redux/store';

  //import orders from '../../redux/actions/authActions'

  import { withRouter } from 'react-router-dom';
  import CustomButton from '../../components/custom-button/custom-button.components'
  import axios from "axios";
  // import {
  //   GET_ERRORS,
  //   SET_CURRENT_USER,
  //   USER_LOADING
  // } from "../../redux/actions/types";


class PlaceOrder extends Component { 
    
  //  constructor() {
  //    super();
     
    
  //  } 
    orders1 = (newOrder, history) => dispatch => {
        console.log(newOrder)
        
     axios
      .post("/orders/add", newOrder)
      .then(res => history.push("/orders")) // re-direct to login on successful register
      

      
  };
  
   onOrder = e => {
    e.preventDefault(); 
   // console.log(this.props.items)
   var item= this.props.items

   const newOrder = {
    OrderID : Math.random().toString(36).substr(2, 9),
    userID: localStorage.userID,
    userContact: localStorage.userContact,
    userName: localStorage.name,
    items: this.props.items,
    RestaurantID: item[0].RestaurantID,
    address: localStorage.address,
    total: this.props.total,
    number: localStorage.number,
    status : "Ordered"
  };

  axios
      .post("/orders/add", newOrder)
      .then(res => this.props.history.push("/orders"))
  }

  render() {
    return (
        <CustomButton  onClick = {this.onOrder } > Place Order  </CustomButton>
    );
      
  };
}

PlaceOrder.propTypes = {
    orders: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

export default withRouter(PlaceOrder)

  

