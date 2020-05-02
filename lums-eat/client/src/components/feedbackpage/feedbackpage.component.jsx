import React from 'react';

import FeedbackTable from '../feedbacktable/feedbacktable.component';
// import NewOrderItem from '../new-order-item/new-order-item.component';
import Table from 'react-bootstrap/Table';

import './feedbackpage.styles.scss';

class FeedbackPage extends React.Component {
  constructor() {
    super();

      this.state={
        allfeedback: []
      }
    
  }

  componentDidMount(){
    fetch(`/feedback/byrestaurant/${localStorage.RestaurantID}`)
    .then(res=> res.json())
    .then(allfeedback => this.setState({allfeedback}))
  }

  render() {
    return (
      <div>
        <div className='restaurant-menu'>
          <div className="top">
            Feedback <span className="new-number">{this.state.allfeedback.length}</span>
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>User</th>
                <th>Restaurant</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allfeedback.map(({ id, ...otherSectionProps }) => (
                <tr>
                <FeedbackTable key={id} {...otherSectionProps} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default FeedbackPage;