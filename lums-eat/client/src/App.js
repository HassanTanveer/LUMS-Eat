import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import RestaurantPage from './pages/restaurantpage/restaurantpage.component';
import OrdersPage from './pages/orderspage/orderspage.component';
import AnalyticsPage from './pages/analyticspage/analyticspage.component';
import ShopPage from './pages/shop/shop.component';
import MenuUpdate from './pages/menu-update/menu-update.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component.jsx';
import { setCurrentUser } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import FeedbacksPage from './pages/feedbackpage/feedbackpage.component';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path = '/checkout' component={CheckoutPage} />
          <Route exact path = '/restaurant' component={RestaurantPage} />
          <Route exact path = '/analytics' component={AnalyticsPage} />
          <Route exact path = '/orders' component={OrdersPage} />
          <Route exact path = '/menu-update' component={MenuUpdate} />
          <Route exact path = '/feedback' component={FeedbacksPage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);