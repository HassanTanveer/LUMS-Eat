import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {selectCurrentUser} from '../../redux/user/user.selectors.js';
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
      <Link className='title1' to='/'>{"  "} </Link>
      <Link className='title1' to='/'>{"LUMS"}</Link>
      <Link className='title' to='/'>{"EAT"}</Link>
    </Link>
    <div className='options'>

      <Link className='option' to='/analytics'>
        RESTAURANT ANALYTICS
      </Link>
      <Link className='option' to='/restaurant'>
        RESTAURANT
      </Link>
      <Link className='option' to='/menu-update'>
        MENU AVAILABILITY
      </Link>
      <Link className='option' to='/orders'>
        ORDERS
      </Link>
      {currentUser ? (
        <div className='option'>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
