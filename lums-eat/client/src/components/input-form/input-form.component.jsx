import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './input-form.styles.scss';

class InputForm extends React.Component {
  constructor() {
    super();

      this.state={

      }
    
  }

  componentDidMount(){
    
  }

  handleSubmit = (event ) => {
    console.log(event)
  }

  handleInputChange = (event ) => {
    console.log(event)
  }

  render() {
    return (
      <div>
        <Form>
            <Form.Group controlId="Name">
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="name" placeholder="Enter item name" />
            </Form.Group>

            <Form.Group controlId="Price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="type" />
            </Form.Group>
            {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit" onChange={this.handleSubmit}>
                Submit
            </Button>
        </Form>
      </div>
    );
  }
}

export default InputForm;