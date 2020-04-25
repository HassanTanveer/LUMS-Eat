
import React from "react";
// import ReactDOM from "react-dom";
import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';


class Collection extends React.Component {

    constructor(props) {
      super(props);
  
        this.state={
        collection: [],
        
        }

        
  
        
      
    }
  
    componentDidMount( )
    {
      
     //console.log(`This is match ${this.props.match.params.id}`)
      fetch(`/menu/find/${this.props.match.params.id}`)
      .then(res=> res.json())
      .then(collection => this.setState({collection}))
    }
  
    render() {
       
        
 
    return (
      
  
      <div className='collection-page'>
      <h2 className='title'>{this.props.match.params.id} </h2>
      <div className='items'>
        {this.state.collection.map(item => (
          <CollectionItem key={item.ItemId} item={item} />
        ))}
      </div>
    </div>
    );
    }
  
    
  }

  export default Collection