import React from 'react';
import { withRouter } from 'react-router-dom';
import './new-order-item.styles.scss';

const axios = require('axios')

const OrderItem = ({ OrderID, items, totalPrice, status, Type, userID, userName, userAddress, userContact,  history, linkUrl, match }) => {
  
  return(
    <>
        <td className = 'font'>{OrderID}</td>
        <td className = 'font'>
            {items.map(item => {
                return <span className = 'items'>{item.name} - <span className = 'inside'>{item.quantity}</span></span>
            })}
        </td>
        <td className = 'font'>{totalPrice}</td>
        <td className = 'font'>{Type}</td>
        {/* <td className = 'font'>{userName}</td> */}
        <td className = 'font'><div>{userName}</div>{userContact}</td>
        <td className = 'font'>{userAddress}</td>
        <td className = 'font'>{status}</td>
        <td><span className = 'new-accept' onClick ={
          () => {
            let change = {
              "OrderID": OrderID,
              "update": {
                  "status": "Pending"
              }
            }
            axios.post('/orders/update', change)
              .then(() => window.location.reload())
              .catch(err => console.log(err))
          }
        }>Accept</span>
        <span className = 'new-decline' onClick = {
          () => {
            let change = {
              "OrderID": OrderID,
              "update": {
                  "status": "Declined"
              }
            }
            axios.post('/orders/update', change)
              .then(() => window.location.reload())
              .catch(err => console.log(err))
          }}>Decline</span></td>

    </>
  )
};
export default withRouter(OrderItem);