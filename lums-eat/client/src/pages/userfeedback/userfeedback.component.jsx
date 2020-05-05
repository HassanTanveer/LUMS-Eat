import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './userfeedback.styles.scss';

import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
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

  updateFeedback(event) {
    this.setState({Feedback: event.target.value})
  }

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
      .then((res) => this.setState({text2: 'Feedback has been sent to restaurant!'}), this.setState({text: 'Feedback Sent!'}), this.setState({popupshow: true}))
      .catch(err => this.setState({text2: 'Feedback for this order has already been submitted!'}), this.setState({text: 'Error'}), this.setState({popupshow: true}))
  };

  refresh = (event) => {
    window.location.reload();
  }

  componentDidMount( )
    {
      const { order } = this.props.location.state
      const { restaurant } = this.props.location.state
      // const { item } = this.props.location.state
      
      this.setState({RestaurantID: restaurant})
      this.setState({OrderID: order})
    }

  renderIcon(){
    this.setState({UserID: 'CHECK'})
    return(
      <div>Function called</div>
    )
  }

  render() {
    return (
      <dic className = 'restaurantpage'>
        <div className = 'check'>
            <Link to="/orders" class = "a"> <i className="material-icons">close</i> </Link>
          <div>
            <h4>
              <b>Submit</b> feedback 
            </h4>
            <p >
              <b>Restaurant:</b> {this.state.RestaurantID.toUpperCase()}, <b>Order ID:</b> {this.state.OrderID}
            </p>
          </div>
          {/* <div className="col s12">
            <h4>
              <b>Submit</b> feedback
            </h4>
            <p className="grey-text text-darken-1">
              Restaurant: {this.state.RestaurantID.toUpperCase()}
            </p>
          </div> */}
          {/* <div className = 'center'>
            <h1>Submit Feedback</h1>
            <h1>Restaurant: {this.state.RestaurantID.toUpperCase()}</h1>
            <h1>Order ID: {this.state.OrderID}</h1>
          </div> */}

          <Form onSubmit = {this.onSubmit}>
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