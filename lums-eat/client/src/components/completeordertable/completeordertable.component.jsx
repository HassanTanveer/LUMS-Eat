import React from 'react';
import { withRouter } from 'react-router-dom';
import './completeordertable.styles.scss';
import { Link } from 'react-router-dom';


// const axios = require('axios')

const ComleteOrderTable = ({ OrderID, items, totalPrice, status, Type, userAddress, RestaurantID, history, linkUrl, match }) => {
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
        {/* <td className = 'font'>{status}</td>         */}
        <td className = 'font'>
          <Link className='FeedbackButton' to={{pathname: '/userfeedback', state: {order: OrderID, restaurant:RestaurantID, item: items}}}>
            Give Feedback
          </Link>
        </td>

    </>
  )
};
export default withRouter(ComleteOrderTable);