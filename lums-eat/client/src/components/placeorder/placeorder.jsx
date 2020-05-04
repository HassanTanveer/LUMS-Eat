import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button.components'
import axios from "axios";

class PlaceOrder extends Component { 
    
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

    console.log(newOrder)
    axios
        .post("/orders/add", newOrder)
        .then(res => console.log(res))
        .catch(err => console.log(err))
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

  

