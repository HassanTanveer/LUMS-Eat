import React from "react";
import './collection.styles.scss';
import _ from 'lodash';
import CollectionPreview from '../../components/collection-preview/collection-preview'
// import ReactDOM from "react-dom";
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
      let temp2  =(Object.values(temp))

      button= temp2.map((items => (
        <CollectionPreview items={items} />))
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