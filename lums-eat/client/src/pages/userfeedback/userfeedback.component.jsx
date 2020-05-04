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
        ItemID: '',
        OrderID: '',
        RestaurantID: '',
        Feedback: '',

        popupshow: false,
        text: 'Feedback Sent!',
        text2: 'Feedback has been sent to restaurant!'

      }  
  }

  updateUserID(event) {
    this.setState({UserID: event.target.value})
  }

  updateItemID(event) {
    this.setState({ItemID: event.target.value})
  }

  updateOrderID(event) {
    this.setState({OrderID: event.target.value})
  }

  updateRestaurantID(event) {
    this.setState({RestaurantID: event.target.value})
  }

  updateFeedback(event) {
    this.setState({Feedback: event.target.value})
  }

  handleSubmit = (text) => (event) => {
    event.preventDefault();
    let details = {
      "UserID": text,
      "ItemID": this.state.ItemID,
	    "OrderID": this.state.OrderID,
	    "RestaurantID": this.state.RestaurantID,
	    "Feedback": this.state.Feedback
      }
    axios.post('/feedback/add', details)
      .then((res) => this.setState({text2: 'Feedback has been sent to restaurant!'}), this.setState({popupshow: true}))
      .catch(err => this.setState({text: 'Error'}), this.setState({text2: 'Feedback already submitted for this order'}), this.setState({popupshow: true}))
  }

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
      this.setState({ItemID: item[0][0]})
    }

  renderIcon(){
    this.setState({UserID: 'CHECK'})
    return(
      <div>Function called</div>
    )
  }

  render() {
    // const { user } = this.props.auth;
    // const { order } = this.props.location.state
    // const { restaurant } = this.props.location.state
    // const { item } = this.props.location.state
    return (
      <dic className = 'restaurantpage'>
        <div className = 'check'>
          <div className = 'center'>
            <h1>Submit Feedback</h1>
            <h1>Restaurant: {this.state.RestaurantID.toUpperCase()}</h1>
            <h1>Order ID: {this.state.OrderID}</h1>
          </div>

          
          <Form onSubmit = {this.handleSubmit(localStorage.name)}>
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