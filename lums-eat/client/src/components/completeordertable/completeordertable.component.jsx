import React from 'react';
import { withRouter } from 'react-router-dom';
import './completeordertable.styles.scss';
import { Link } from 'react-router-dom';


// const axios = require('axios')

const CompleteOrderTable = ({ OrderID, items, totalPrice, status, Type, userAddress, RestaurantID, history, linkUrl, match }) => {
  return(
    <>
        <td className = 'font'>{OrderID}</td>
        <td className = 'font'>{(() => {
            switch (RestaurantID) {
                case "zakir":   return <span>Zakir Tikka</span>
                case "jammin":   return <span>Jammin Java</span>
                case "delish":   return <span>Delish Pizza Bar</span>
                case "tabaq":   return <span>Tabaq</span>
                case "flavors":   return <span>Flavors</span>
                case "subway":   return <span>Subway</span>            
                default:      return <span >{RestaurantID}</span>;
        }
        })()}</td>
        <td className = 'font'>
            {items.map(item => {
                return <span className = 'items'>{item.name} - <span className = 'inside'>{item.quantity}</span></span>
            })}
        </td>
        <td className = 'font'>{totalPrice}</td>
        <td className = 'font'>{Type}</td>
        <td className = 'font'>{userAddress}</td>
        <td className = 'font'>{status}</td>
        <td className = 'font'>
          <Link className='FeedbackButton' to={{pathname: '/userfeedback', state: {order: OrderID, restaurant:RestaurantID, item: items}}}>
            Give Feedback
          </Link>
        </td>

    </>
  )
};
export default withRouter(CompleteOrderTable);