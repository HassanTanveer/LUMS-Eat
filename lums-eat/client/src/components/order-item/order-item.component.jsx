import React from 'react';
import { withRouter } from 'react-router-dom';

import './order-item.styles.scss';

const OrderItem = ({ OrderID, totalPrice, status, Type, userID,  history, linkUrl, match }) => (
  <div
  size='large'
    className={'order-item'}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >

    <div className='content'>
        <div className='orders'>
            <div className = 'order'>{userID}</div>
            <div className = 'order'>{totalPrice}</div>
            <div className = 'order'>{status}</div>
            <div className = 'order'>{Type}</div>
        </div>

    </div>
  </div>
);

export default withRouter(OrderItem);
