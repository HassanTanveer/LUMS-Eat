import React from 'react';
import { withRouter } from 'react-router-dom';
import './order-item.styles.scss';

const axios = require('axios')

const OrderItem = ({ OrderID, items, totalPrice, status, Type, userID, userName, userContact, userAddress,  history, linkUrl, match }) => {
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
        <td className = 'font '><div className = 'middle'>{userName}</div>{userContact}</td>
        <td className = 'font'>{userAddress}</td>
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
                            .then((res) => {
                                window.location.reload()
                            })
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
                case "Complete": return <span className = 'complete' onClick = {
                    () => {
                        let change = {
                            "OrderID": OrderID,
                            "update": {
                                "status": "Pending"
                            }}
                        axios.post('/orders/update', change)
                        .then((res) => window.location.reload())
                        .catch(err => console.log(err))
                    }}
                    >Undo</span>;
                default: return <span className = 'button' onClick ={() => alert('button')}>button</span>;
        }
        })()}
        </td>
        

    </>
  )
};
export default withRouter(OrderItem);