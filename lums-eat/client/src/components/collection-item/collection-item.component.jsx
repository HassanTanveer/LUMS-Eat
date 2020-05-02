import React from 'react';
import { connect } from 'react-redux';
// import {compose} from 'redux';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import './collection-item.styles.scss';
// import { Link } from 'react-router-dom';

const CollectionItem = ({ item, addItem, history, match }) => {
  const { name, price, imageurl } = item;

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageurl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>Rs{price}</span>
      </div>
      {localStorage.email ?(
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>):
      (<CustomButton onClick={()=>  history.push('/login') }   >
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