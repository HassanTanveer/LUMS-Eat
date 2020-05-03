
import React from "react";
// import ReactDOM from "react-dom";
import './collection.styles.scss';

import _ from 'lodash';

import CollectionPreview from '../../components/collection-preview/collection-preview'

// import CollectionItem from '../../components/collection-item/collection-item.component';


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
      let button;
    
      
      let temp =  _.groupBy(this.state.collection, 'category')
       
     // let temp3= Object(temp).map(item=> console.log)

     let temp2  =(Object.values(temp))
      //let temp3= Object.values(temp2)

     button= temp2.map((items => (
      //<CollectionItem key={item.ItemId} item={item} />
      <CollectionPreview key={items._id} items={items} />))
     // items.map(item=> (<CollectionItem key={item.ItemId} item={item} />))
    )
      

     
       
        
 
    return (
      
  
      <div className= 'collection-page' >
      <h2 className='title'> {this.props.match.params.id} </h2>
      <div className='collections-overview'>

      
      
        {button}
        </div>
      
    </div>
    );
    }
  
    
  }

  export default Collection