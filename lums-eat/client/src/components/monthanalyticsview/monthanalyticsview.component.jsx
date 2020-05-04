import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

import './monthanalyticsview.styles.scss';

class AnalyticsView extends React.Component {
  constructor() {
    super();

      this.state={
      sections: [],
      }
    
  }

  componentDidMount(){
    // const date = this.getCurrentDate();
    fetch(`/orders/complete/${this.getCurrentDate()}/${localStorage.RestaurantID}`)
    .then(res=> res.json())
    .then(sections => this.setState({sections}))
  }

  // countTotal = () => {
  //   let total = 0

  //   for (let i = 0; i < this.state.sections.length; i++) {
  //     total = total + 1;
  //   }

  //   return total
  // }

  totalPrice = () => {
    let total = 0
    for (let i = 0; i < this.state.sections.length; i++) {
      var order = this.state.sections[i];
      total = total + order.totalPrice;
    }
    return total
  }

  findHighest = () => {
    var most = []; // create an empty array

    for (let i = 0; i < this.state.sections.length; i++)
    {
      var check = this.state.sections[i];

      if(check)
      {
        var check2 = check.items;
      }

      for (let j = 0; j < check2.length; j++)
      {
        var found = 0;
        var check3 = check2[j];

        for (let c = 0; c < most.length; c++)
        {
          if(most[c].key == check3[0])
          {
            most[c].value = most[c].value + parseInt(check3[1]);
            found = 1;
          }
        }

        if(found == 0)
        {
          most.push({
            key:   check3[0],
            value: parseInt(check3[1])
          });
        }
      }
    }

    var highindex = 0;
    var highest = 0;
    for (let i = 0; i < most.length; i++) {
      if (most[i].value > highest){
        highest = most[i].value;
        highindex = i;
      }
    }
    var final = most[highindex];

    if(final)
    {
      var mostordered = final.key;
    }

    return mostordered
  }

  getCurrentDate(separator='-'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}`
  }

  render() {

    // const total = this.countTotal();
    const revenue = this.totalPrice();
    const most = this.findHighest();
    const date = this.getCurrentDate();

    return (
      <div>
        <div className='restaurant-menu'>
          <div className="top">
            <Link className='top' to='/analytics'>
              TODAY
            </Link>
            <Link className='top' to='/analytics/month'>
              MONTH
            </Link>
            <Link className='top' to='/analytics/year'>
              YEAR
            </Link>
            <Link className='top' to='/analytics/total'>
              TOTAL
            </Link>
          </div>
          <Table responsive>
            <thead>
              <tr className = 'font'>
                <th>Number of orders</th>
                <th>Most ordered item</th>
                <th>Revenue</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              <td className = 'font'>{this.state.sections.length}</td>
              <td className = 'font'>{most}</td>
              <td className = 'font'>{revenue} PKR</td>
              <td className = 'font'>{date}</td>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AnalyticsView;
