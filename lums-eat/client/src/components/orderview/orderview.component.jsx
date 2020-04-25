import React from 'react';

import OrderItem from '../order-item/order-item.component';
import NewOrderItem from '../new-order-item/new-order-item.component';
import Table from 'react-bootstrap/Table';

import './orderview.styles.scss';

class OrderView extends React.Component {
  constructor() {
    super();

      this.state={
      sections: [],
      newsections: []
      }
    
  }

  componentDidMount(){
    fetch('/orders/all')
    .then(res=> res.json())
    .then(sections => this.setState({sections}))

    fetch('/orders/new')
    .then(res=> res.json())
    .then(newsections => this.setState({newsections}))
  }

  render() {
    return (
      <div>
        <div className='restaurant-menu'>
          <div className="top">
            New Orders
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Order number</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Order Type</th>
                <th>User ID</th>
                <th>User Contact</th>
                <th>User Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.newsections.map(({ id, ...otherSectionProps }) => (
                <tr>
                <NewOrderItem key={id} {...otherSectionProps} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className='restaurant-menu'>
          <div className="top">
            Orders <span className="number">{this.state.sections.length}</span> 
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Order number</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Order Type</th>
                <th>User ID</th>
                <th>User Contact</th>
                <th>User Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sections.map(({ id, ...otherSectionProps }) => (
                <tr>
                <OrderItem key={id} {...otherSectionProps} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default OrderView;
