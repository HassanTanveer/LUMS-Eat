import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ RestaurantID, name, imageurl, category, rating,  history, linkUrl, match }) => (

  <div
  
    className={`menu-item`}
    onClick={() => history.push(`${match.url}${'shop/'}${RestaurantID}`)}

   
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageurl})`
      }}
    />
    <div className='content'>
      <h1 className='title'>{name.toUpperCase()}</h1>
    <span className='subtitle'>{category}       *{rating} /5</span>
   

    </div>
  </div>
);

export default withRouter(MenuItem);
