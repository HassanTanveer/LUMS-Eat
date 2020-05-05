import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import { withRouter } from 'react-router-dom';
import './notifications.css';
import './collection-item.styles.scss';
import { createStructuredSelector } from 'reselect';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {
  selectCartItems

} from '../../redux/cart/cart.selectors';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
// import {compose} from 'redux';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { Link } from 'react-router-dom';

const CollectionItem = ({ item, addItem, history, match, cartItems, itemCount }) => {
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
      <CustomButton onClick={() => {
        var rid
        rid= cartItems.map((item =>  item.RestaurantID))
        rid= rid[0]
        
        
        if(itemCount===0){
        addItem(item);
        NotificationManager.warning('Item added to cart');

        }      
        
         if(rid=== item.RestaurantID){ addItem(item);  NotificationManager.warning('Item added to cart'); }
        
        else if(rid!==item.RestaurantID&& itemCount!==0) {  NotificationManager.warning('Can not add items from multiple restaurants');    }
        }} inverted>
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
  cartItems: selectCartItems,
  itemCount: selectCartItemsCount
  
  
});




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItem))