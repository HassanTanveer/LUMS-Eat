import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import { withRouter } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './notifications.css';
import './collection-item.styles.scss';
// import {compose} from 'redux';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { Link } from 'react-router-dom';

const CollectionItem = ({ item, addItem, history, match }) => {
  const { name, price, imageurl, RestaurantID } = item;

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
      <CustomButton onClick={() => {addItem(item); NotificationManager.info('Item added to cart');}} inverted>
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
  addItem: item => dispatch(addItem(item))
});



export default withRouter(connect(null, mapDispatchToProps)(CollectionItem))