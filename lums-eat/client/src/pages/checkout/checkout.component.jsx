import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import CustomButton from '../../components/custom-button/custom-button.components'
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PlaceOrder from '../../components/placeorder/placeorder';

//import store from '../../redux/store';

import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';
//import placeorder from '../../components/placeorder/placeorder';

const CheckoutPage = ({ cartItems, total }) => {
  
   
    let button;
    if (total!==0) {
      button= <PlaceOrder items= {cartItems}  total= {total}/>
      
       } 

//       console.log(store.getState())
      
    
  

  
  return(
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='total'>TOTAL: Rs.{total}</div>
    
    {button}

    
    

  </div>
  )
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
