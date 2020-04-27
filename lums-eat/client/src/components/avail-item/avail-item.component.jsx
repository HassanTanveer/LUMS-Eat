import React from 'react';
import './avail-item.styles.scss';

const axios = require('axios')

const AvailItem = ({ItemID, name, price, availability}) => {
    return(
      <>
          <td className = 'font'>{ItemID}</td>
          <td className = 'font'>{name}</td>
          <td className = 'font'>{price}</td>
          <td>{(() => {
            switch (availability) {
                case "Yes":   return <span className = 'font'>Available</span>;
                case "No": return <span className = 'font'>Unavailable</span>;
                default: return <span className = 'font'>-</span>;
            }
            })()}
          </td>      
          <td>{(() => {
            switch (availability) {
                case "Yes":   return <span className = 'yes' onClick ={
                    () => {
                        let change = {
                            "ItemID": ItemID,
                            "update": {
                                "availability": "No"
                            }}
                        axios.post('/menu/update', change)
                            .then((res) => window.location.reload())
                            .catch(err => console.log(err))
                    }}
                    >Pause</span>;
                case "No": return <span className = 'no' onClick = {
                    () => {
                        let change = {
                            "ItemID": ItemID,
                            "update": {
                                "availability": "Yes"
                            }}
                        axios.post('/menu/update', change)
                        .then((res) => window.location.reload())
                        .catch(err => console.log(err))
                    }}
                    >Resume</span>;
                default: return <span className = 'button' onClick ={() => alert('button')}>button</span>;
        }
        })()}
        </td>       
  
      </>
    )
  };

export default AvailItem
