import React from 'react';
import { Link } from 'react-router-dom';

import OrderItem from '../order-item/order-item.component';
import Table from 'react-bootstrap/Table';

import './analyticsview.styles.scss';

class AnalyticsView extends React.Component {
  constructor() {
    super();

      this.state={
      sections: [],
      newsections: []
      }
    
  }

  // componentDidMount(){
  //   fetch('/orders/all')
  //   .then(res=> res.json())
  //   .then(sections => this.setState({sections}))

  //   fetch('/orders/new')
  //   .then(res=> res.json())
  //   .then(newsections => this.setState({newsections}))
  // }

  render() {
    return (
      <div>
        <div className='options'>
          <Link className='option' to='/analytics'>
            DAILY
          </Link>
          <Link className='option' to='/analytics'>
            WEEKLY
          </Link>
          <Link className='option' to='/analytics'>
            MONTHLY
          </Link>
        </div>

        <div className='restaurant-menu'>
          <div className="top">
            Orders
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Number of orders</th>
                <th>Most ordered item</th>
                <th>Revenue</th>
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

export default AnalyticsView;
