import React from 'react';
import './avail-rest.styles.scss';

const axios = require('axios')

const AvailRestaurant = ({RestaurantID, name, email, password, address, number, imageurl, rating, category, description, status}) => {
    return(
      <>
          <td>{(() => {
            switch (status) {
                case "Open":   return <span className = 'font'>Currently Open</span>;
                case "Close": return <span className = 'font'>Currently Closed</span>;
                default: return <span className = 'font'>-</span>;
            }
            })()}
          </td>      
          <td>{(() => {
            switch (status) {
                case "Open":   return <span className = 'open' onClick ={
                    () => {
                        let change = {
                            "RestaurantID": RestaurantID,
                            "update": {
                                "status": "Close"
                            }}
                        axios.post('/restaurants/update/', change)
                            .then((res) => window.location.reload())
                            .catch(err => console.log(err))
                    }}
                    >Close</span>;
                case "Close": return <span className = 'close' onClick = {
                    () => {
                        let change = {
                            "RestaurantID": RestaurantID,
                            "update": {
                                "status": "Open"
                            }}
                        axios.post('/restaurants/update/', change)
                        .then((res) => window.location.reload())
                        .catch(err => console.log(err))
                    }}
                    >Open</span>;
                default: return <span className = 'button' onClick ={() => alert('button')}>button</span>;
        }
        })()}
        </td>       
  
      </>
    )
  };

export default AvailRestaurant
