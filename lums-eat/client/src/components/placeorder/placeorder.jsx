import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createStructuredSelector } from 'reselect';
 import { withRouter } from 'react-router-dom';
  import CustomButton from '../../components/custom-button/custom-button.components'
  import axios from "axios";

  import {
    selectCartItems
  
  } from '../../redux/cart/cart.selectors';
  
  import {
    clearItemFromCart
    
  } from '../../redux/cart/cart.actions';


class PlaceOrder extends Component { 
  
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
    status : "New"
  };

  axios
      .post("/orders/add", newOrder)
      .then(res => this.props.history.push("/orders"))

      this.props.cartItems.map(item => (
        this.props.clearItem(item)
        ))

  //console.log(newOrder)


  //this.orders1(newOrder, this.props.history)

  
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

  const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
    
    
  });
  
  const mapDispatchToProps = dispatch => ({
    
    clearItem : item => dispatch(clearItemFromCart(item))
  });

  export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
  )(PlaceOrder));
  

  

