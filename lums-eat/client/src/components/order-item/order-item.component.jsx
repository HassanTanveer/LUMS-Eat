import React from 'react';
import { withRouter } from 'react-router-dom';
import './order-item.styles.scss';

const axios = require('axios')

const OrderItem = ({ OrderID, totalPrice, status, Type, userID,  history, linkUrl, match }) => {
  return(
    <>
        <td className = 'font'>{OrderID}</td>
        <td className = 'font'>{totalPrice}</td>
        <td className = 'font'>{Type}</td>
        <td className = 'font'>{userID}</td>
        <td className = 'font'>{status}</td>
        <td>{(() => {
            switch (status) {
                case "Dispatched":   return <span className = 'disp' onClick ={
                    () => {
                        let change = {
                            "OrderID": OrderID,
                            "update": {
                                "status": "Complete"
                            }}
                        axios.post('/orders/update', change)
                            .then((res) => window.location.reload())
                            .catch(err => console.log(err))
                    }}
                    >Complete</span>;
                case "Pending": return <span className = 'pend' onClick = {
                    () => {
                        let change = {
                            "OrderID": OrderID,
                            "update": {
                                "status": "Dispatched"
                            }}
                        axios.post('/orders/update', change)
                        .then((res) => window.location.reload())
                        .catch(err => console.log(err))
                  }}
                    >Dispatch</span>;
                default:      return <span className = 'button' onClick ={() => alert('button')}>button</span>;
        }
        })()}
        </td>
        

    </>
  )
};

export default withRouter(OrderItem);
