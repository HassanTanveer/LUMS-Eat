import React from 'react';
import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';

import OrderTable from '../ordertable/ordertable.component';
import CompleteOrderTable from '../completeordertable/completeordertable.component';
// import NewOrderItem from '../new-order-item/new-order-item.component';
import Table from 'react-bootstrap/Table';
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

import './orderpage.styles.scss';

class OrderPage extends React.Component {
  constructor() {
    super();

      this.state={
        active: [],
        unconfirmed: [],
        complete: [],
      } 
  }

  componentDidMount(){
    if(localStorage.userID){
      fetch(`/users/neworders/${localStorage.userID}`)
      .then(res=> res.json())
      .then(unconfirmed => this.setState({unconfirmed}))

      console.log(this.state.unconfirmed)
  
      fetch(`/users/pendingorders/${localStorage.userID}`)
      .then(res=> res.json())
      .then(active => this.setState({active}))

      console.log(this.state.active)
  
      fetch(`/users/completedorders/${localStorage.userID}`)
      .then(res=> res.json())
      .then(complete => this.setState({complete}))
    }
  }

  render() {
    return (
      <div>
        <script type="text/javascript">
            {setTimeout(function () { 
              if(window.location.href === `${window.location.origin}/orders`){
                window.location.reload();
              }
            }, 15000)}
        </script>
        <div className='restaurant-menu'>
          <div className="top">
            Pending Confirmation <span className="new-number">{this.state.unconfirmed.length}</span>
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Order number</th>
                <th>Restaurant</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Order Type</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.unconfirmed.map(({ id, ...otherSectionProps }) => (
                <tr>
                <OrderTable key={id} {...otherSectionProps} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className='restaurant-menu'>
          <div className="top">
            Active Orders <span className="active-number">{this.state.active.length}</span> 
          </div>
          <Table responsive>
            <thead>
                <tr className = 'font'>
                  <th>Order number</th>
                  <th>Restaurant</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Order Type</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
            </thead>
            <tbody>
              {this.state.active.map(({ id, ...otherSectionProps }) => (
                <tr>
                <OrderTable key={id} {...otherSectionProps} />
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
                  <th>Order number</th>
                  <th>Restaurant</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Order Type</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Feedback</th>
                </tr>
            </thead>
            <tbody>
              {this.state.complete.map(({ id, ...otherSectionProps }) => (
                <tr>
                <CompleteOrderTable key={id} {...otherSectionProps} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      </div>
    );
  }
}

OrderPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(OrderPage);

// export default OrderPage;