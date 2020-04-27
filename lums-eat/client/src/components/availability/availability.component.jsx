import React from 'react';

import AvailItem from '../avail-item/avail-item.component';
// import NewOrderItem from '../new-order-item/new-order-item.component';
import Table from 'react-bootstrap/Table';

import './availability.styles.scss';

class MenuUpdate extends React.Component {
  constructor() {
    super();

      this.state={
        state: []
      }
    
  }

  componentDidMount(){
    fetch('/menu/all')
    .then(res=> res.json())
    .then(state => this.setState({state}))

  }

  render() {
    return (
      <div>
        <div className='restaurant-menu'>
          <div className="top">
            Menu Items
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Item Number</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Availability </th>
              </tr>
            </thead>
            <tbody>
              {this.state.state.map(({ id, ...otherSectionProps }) => (
                <tr>
                <AvailItem key={id} {...otherSectionProps} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      </div>
    );
  }
}

export default MenuUpdate;