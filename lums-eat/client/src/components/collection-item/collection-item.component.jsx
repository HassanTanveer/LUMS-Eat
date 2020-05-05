import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import { withRouter } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './notifications.css';
import './collection-item.styles.scss';
import { createStructuredSelector } from 'reselect';

import {
  selectCartItems

} from '../../redux/cart/cart.selectors';
// import {compose} from 'redux';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { Link } from 'react-router-dom';

const CollectionItem = ({ item, addItem, history, match, cartItems }) => {
  const { name, price, imageurl } = item;

  



  return (
    <div className='collection-item'>
      <NotificationContainer/>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageurl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>PKR {price}</span>
      </div>
      {localStorage.email ?(
      <CustomButton onClick={() => {addItem(item); NotificationManager.warning('Item added to cart');}} inverted>
        Add to cart
      </CustomButton>):
      (<CustomButton onClick={()=>  {history.push('/login'); window.location.reload()}}>
        Add to cart
      </CustomButton>
      )
      }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),

});

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
  
  
});




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItem))