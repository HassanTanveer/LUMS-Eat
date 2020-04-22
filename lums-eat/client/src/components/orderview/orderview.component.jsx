import React from 'react';

import OrderItem from '../order-item/order-item.component';

import './orderview.styles.scss';

class OrderView extends React.Component {
  constructor() {
    super();

      this.state={
      sections: []
      }
    
  }

  componentDidMount(){
    fetch('/orders/all')
    .then(res=> res.json())
    .then(sections => this.setState({sections}))
  }

  render() {
    return (
      
      <div className='restaurant-menu'>
        <div className='orders'>
            <div className = 'order'>User ID</div>
            <div className = 'order'>Total Price</div>
            <div className = 'order'>Status</div>
            <div className = 'order'>Type</div>
        </div>
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <OrderItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default OrderView;
