import React from 'react';
import { withRouter } from 'react-router-dom';
import './ordertable.styles.scss';

// const axios = require('axios')

const OrderTable = ({ OrderID, items, totalPrice, status, Type, userAddress, RestaurantID,  history, linkUrl, match }) => {
  return(
    <>
        <td className = 'font'>{OrderID}</td>
        <td className = 'font'>
            {items.map(item => {
                return <span className = 'items'>{item[0]} - <span className = 'inside'>{item[1]}</span></span>
            })}
        </td>
        <td className = 'font'>{totalPrice}</td>
        <td className = 'font'>{RestaurantID}</td>
        <td className = 'font'>{Type}</td>
        <td className = 'font'>{userAddress}</td>
        <td className = 'font'>{status}</td>        

    </>
  )
};
export default withRouter(OrderTable);