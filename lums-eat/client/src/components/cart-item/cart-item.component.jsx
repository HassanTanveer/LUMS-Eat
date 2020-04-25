import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { imageurl, price, name, quantity } }) => (
  <div className='cart-item'>
    <img src={imageurl} alt='item' />
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {quantity} x Rs{price}
      </span>
    </div>
  </div>
);

export default CartItem;
