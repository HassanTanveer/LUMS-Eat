import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

class Directory extends Component {  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  constructor() {
    super();
      this.state = {
        sections: [],
        search: ''
      }
    
  }
  

  updateSearch(event) {
    this.setState({search: event.target.value})
  }

  componentDidMount(){
    fetch('/restaurants')
    .then(res=> res.json())
    .then(sections => this.setState({sections}))
  }

  render() {
    const { user } = this.props.auth;
    let filteredRestaurants = this.state.sections.filter(
      (MenuItem) => {
        return MenuItem.name.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
      }
    )
    return (
      <div className='directory-menu'>
        {user.name ? (
          <b>Hey there, {user.name}</b>
        ) : (
          <b>Hey there!</b>
        )}
        <div className='search'>
          <input type = "text"
              className = 'search'
              placeholder = "search..."
              value ={this.state.search} 
              onChange = {this.updateSearch.bind(this)}/>
        </div>
        <hr/>
        <div className='directory-menu'>
          {/* <Search/> */}
          {filteredRestaurants.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
          ))}
        </div>
      </div>
    );
  }
}

Directory.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Directory);
