import React from 'react';
import { withRouter } from 'react-router-dom';
import './feedbacktable.styles.scss';

// const axios = require('axios')

const FeedbackTable = ({ UserID, ItemID, OrderID, RestaurantID, Feedback,  history, linkUrl, match }) => {
  return(
    <>
        <td className = 'font'>{UserID}</td>
        <td className = 'font'>{OrderID}</td>
        <td className = 'font'>{Feedback}</td>        

    </>
  )
};
export default withRouter(FeedbackTable);