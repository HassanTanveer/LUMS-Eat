import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './userfeedback.styles.scss';

import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";


const axios = require('axios')

class UserFeedbackPage extends React.Component {
  constructor() {
    super();
    
      this.state={
        UserID: '',
        // ItemID: '',
        OrderID: '',
        RestaurantID: '',
        Feedback: '',

        popupshow: false,
        text: 'Feedback Sent!',
        text2: 'Feedback has been sent to restaurant!'

      }  
  }

  // updateUserID(event) {
  //   this.setState({UserID: event.target.value})
  // }

  // updateItemID(event) {
  //   this.setState({ItemID: event.target.value})
  // }

  // updateOrderID(event) {
  //   this.setState({OrderID: event.target.value})
  // }

  // updateRestaurantID(event) {
  //   this.setState({RestaurantID: event.target.value})
  // }

  updateFeedback(event) {
    this.setState({Feedback: event.target.value})
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   let details = {
  //     "UserID": localStorage.name,
  //     "ItemID": this.state.ItemID,
	//     "OrderID": this.state.OrderID,
	//     "RestaurantID": this.state.RestaurantID,
	//     "Feedback": this.state.Feedback
  //     }
  //   axios.post('/feedback/add', details)
  //     .then((res) => this.setState({text2: 'Feedback has been sent to restaurant!'}), this.setState({popupshow: true}))
  //     .catch(err => this.setState({text: 'Error'}), this.setState({text2: 'Could not send feedback!'}), this.setState({popupshow: true}))
  // }

  onSubmit = e => {
    e.preventDefault();
    let details = {
      "UserID": localStorage.name,
      // "ItemID": this.state.ItemID,
	    "OrderID": this.state.OrderID,
	    "RestaurantID": this.state.RestaurantID,
	    "Feedback": this.state.Feedback
      }
    axios.post('/feedback/add', details)
      .then((res) => this.setState({text2: 'Feedback has been sent to restaurant!'}), this.setState({popupshow: true}))
      .catch(err => this.setState({text: 'Error'}), this.setState({text2: 'Could not send feedback!'}), this.setState({popupshow: true}))
  };

  refresh = (event) => {
    window.location.reload();
  }

  componentDidMount( )
    {
      const { order } = this.props.location.state
      const { restaurant } = this.props.location.state
      const { item } = this.props.location.state
      
      this.setState({RestaurantID: restaurant})
      this.setState({OrderID: order})
      // this.setState({ItemID: item[0][0]})
    }

  renderIcon(){
    this.setState({UserID: 'CHECK'})
    return(
      <div>Function called</div>
    )
  }

  render() {
    // const { user } = this.props.auth;
    const { order } = this.props.location.state
    const { restaurant } = this.props.location.state
    const { item } = this.props.location.state
    return (
      <dic className = 'restaurantpage'>
        <div className = 'check'>
          {/* <h1>Submit Feedback</h1> */}
          {/* {user.name ? (
            <b>Hey there, {user.name}, {user.id}, {fromNotifications.check}</b>
          ) : (
            <b>Hey there!</b>
          )} */}

          {/* <h1>Provide Feedback</h1> */}
          <div className = 'center'>
            <h1>Submit Feedback</h1>
            <h1>Restaurant: {this.state.RestaurantID.toUpperCase()}</h1>
            <h1>Order ID: {this.state.OrderID}</h1>
            {/* <h1>Item ID: {this.state.ItemID}</h1>
            <h1>Name: {localStorage.name}</h1> */}
            

          </div>

          
          {/* <Form onSubmit = {this.handleSubmit(user.name.toString())}> */}

          {/* <Form onSubmit = {this.handleSubmit()}> */}
          <Form onSubmit = {this.onSubmit}>
            {/* <Form.Group controlId="UserID">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control type="name"
                                className = 'userid'
                                placeholder="Enter user ID"
                                required
                                // value = {this.state.UserID}
                                value = {user.name}
                                onChange = {this.updateUserID.bind(this)} 
                                />
              </Form.Group> */}

              {/* <Form.Group controlId="ItemID">
                  <Form.Label>Item ID</Form.Label>
                  <Form.Control type="name"
                                className = 'itemid'
                                placeholder="Enter item ID"
                                required
                                value = {this.state.ItemID}
                                onChange = {this.updateItemID.bind(this)}
                                 />
              </Form.Group> */}

              {/* <Form.Group controlId="OrderID">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control type="name"
                                className = 'orderid'
                                placeholder="Enter order ID"
                                required
                                value = {this.state.OrderID}
                                onChange = {this.updateOrderID.bind(this)} />
              </Form.Group> */}

              {/* <Form.Group controlId="Price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number"
                                placeholder="Enter price in pkr"
                                required
                                value ={this.state.price}
                                onChange = {this.updatePrice.bind(this)} />
              </Form.Group> */}

              {/* <Form.Group controlId="RestaurantID">
                  <Form.Label>RestaurantID</Form.Label>
                  <Form.Control type="name"
                                placeholder="Enter Restaurant ID"
                                required
                                value ={this.state.RestaurantID}
                                onChange = {this.updateRestaurantID.bind(this)} />
              </Form.Group> */}

              <Form.Group controlId="Feedback">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control type="name"
                                placeholder="Enter Feedback"
                                required
                                value ={this.state.Feedback}
                                onChange = {this.updateFeedback.bind(this)} />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                  Submit
              </Button>
          </Form>
          <Modal show={this.state.popupshow}>
            <Modal.Header closeButton onClick={()=> this.setState({popupshow: false})}>
              <Modal.Title> {this.state.text} </Modal.Title>
            </Modal.Header>
            <Modal.Body> {this.state.text2} </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.refresh}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </dic>
    );
  }
}

UserFeedbackPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserFeedbackPage);

// export default UserFeedbackPage;