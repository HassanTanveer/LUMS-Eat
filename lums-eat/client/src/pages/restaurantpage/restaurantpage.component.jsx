import React from 'react';

import OrderView from '../../components/orderview/orderview.component';

import './restaurantpage.styles.scss';

console.log(localStorage)
const RestaurantPage = () => (
  <div className='restaurantpage'>
    <OrderView />
  </div>
);

export default RestaurantPage;
