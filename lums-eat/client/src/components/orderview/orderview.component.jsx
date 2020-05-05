import React from 'react';

import OrderItem from '../order-item/order-item.component';
import NewOrderItem from '../new-order-item/new-order-item.component';
import Table from 'react-bootstrap/Table';
import { logoutUser } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import './orderview.styles.scss';

class OrderView extends React.Component {
  constructor() {
    super();

      this.state={
      sections: [],
      newsections: [],
      complete: []
      }
    
  }

  componentDidMount(){

    fetch(`/orders/all/${localStorage.RestaurantID}`)
    .then(res=> res.json())
    .then(sections => this.setState({sections}))

    fetch(`/orders/new/${localStorage.RestaurantID}`)
    .then(res=> res.json())
    .then(newsections => this.setState({newsections}))

    fetch(`/orders/complete/${localStorage.RestaurantID}`)
    .then(res=> res.json())
    .then(complete => this.setState({complete}))
  }

  onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <script type="text/javascript">
            {setTimeout(function () { 
              if(window.location.href === `${window.location.origin}/restaurant`){
                window.location.reload();
              }
            }, 20000)}
        </script>
        <div className='restaurant-menu'>
          <div className="top">
            New Orders
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Order Type</th>
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
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Order Type</th>
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

        <div className='restaurant-menu'>
          <div className="top">
            Completed Orders <span className="completed-number">{this.state.complete.length}</span> 
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Order Type</th>
                <th>User Contact</th>
                <th>User Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.complete.map(({ id, ...otherSectionProps }) => (
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

OrderView.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(OrderView);