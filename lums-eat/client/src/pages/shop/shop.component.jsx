import React from 'react';

// import { withRouter } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';
import Collection from '../../components/collection/collection';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
     <BrowserRouter>
      <Switch>
    <Route exact path="/shop/:id" render = {props => <Collection {...props}  /> }  />       
      </Switch>
    </BrowserRouter>
    
  </div>
);


export default ShopPage;
