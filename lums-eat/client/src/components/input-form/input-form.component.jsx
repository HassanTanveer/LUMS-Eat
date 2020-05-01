import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './input-form.styles.scss';

const axios = require('axios')

class InputForm extends React.Component {
  constructor() {
    super();

      this.state={
        // check: [],
        // check2: [],

        ItemID: '',
        RestaurantID: 'zakir',
        name: '',
        description: '',
        category: '',
        availability: 'Yes',
        price: '',
        imageurl: '',

        popupshow: false,
        text: 'Item Added',
        text2: 'Item has been added to menu!'
      }  
  }

  // componentDidMount(){
  //   fetch('/menu/all')
  //   .then(res=> res.json())
  //   .then(check => this.setState({check}))
  // }

  updateID(event) {
    this.setState({ItemID: event.target.value})
  }

  updateName(event) {
    this.setState({name: event.target.value})
  }

  updatePrice(event) {
    this.setState({price: event.target.value})
  }

  updateDescription(event) {
    this.setState({description: event.target.value})
  }

  updateCategory(event) {
    this.setState({category: event.target.value})
  }

  updateImage(event) {
    this.setState({imageurl: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let details = {
      "ItemID": this.state.ItemID,
      "RestaurantID": this.state.RestaurantID,
	    "name": this.state.name,
	    "description": this.state.description,
	    "category": this.state.category,
	    "availability": this.state.availability,
	    "price": this.state.price,
	    "imageurl": this.state.imageurl
      }
    axios.post('/menu/add', details)
      .then((res) => this.setState({text2: 'Item has been added to menu!'}), this.setState({popupshow: true}))
      .catch(err => this.setState({text: 'Error'}), this.setState({text2: 'Could not add item to menu!'}), this.setState({popupshow: true}))
  }

  refresh = (event) => {
    window.location.reload();
  }

  render() {
    return (
      <div className = 'check'>
        <h1>Add Item to Menu</h1>
        {/* <h1>
          {this.state.check.map((item) =>
            <h>{item.ItemID} </h>
          )}
        </h1> */}

        
        <Form onSubmit = {this.handleSubmit}>
          <Form.Group controlId="ItemID">
                <Form.Label>Item ID</Form.Label>
                <Form.Control type="name"
                              className = 'itemid'
                              placeholder="Enter item ID"
                              required
                              value = {this.state.name}
                              onChange = {this.updateID.bind(this)} />
            </Form.Group>

            <Form.Group controlId="Name">
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="name"
                              className = 'itemname'
                              placeholder="Enter item name"
                              required
                              value = {this.state.name}
                              onChange = {this.updateName.bind(this)} />
            </Form.Group>

            <Form.Group controlId="Price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number"
                              placeholder="Enter price in pkr"
                              required
                              value ={this.state.price}
                              onChange = {this.updatePrice.bind(this)} />
            </Form.Group>

            <Form.Group controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="name"
                              placeholder="Enter item description"
                              required
                              value ={this.state.description}
                              onChange = {this.updateDescription.bind(this)} />
            </Form.Group>

            <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Control type="name"
                              placeholder="Enter item category"
                              required
                              value ={this.state.category}
                              onChange = {this.updateCategory.bind(this)} />
            </Form.Group>

            <Form.Group controlId="Image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                              type="name"
                              placeholder="Enter image url"
                              required
                              value ={this.state.imageurl}
                              onChange = {this.updateImage.bind(this)} />
            </Form.Group>

            <Button variant="primary" type="submit" block>
                Add Item
            </Button>

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
        </Form>
      </div>
    );
  }
}

export default InputForm;