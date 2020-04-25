import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

class Directory extends React.Component {
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
    let filteredRestaurants = this.state.sections.filter(
      (MenuItem) => {
        return MenuItem.name.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
      }
    )
    return (
      <div className='directory-menu'>
        <div className='search'>
          <input type = "text"
              class = 'search'
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

export default Directory;
