import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
<<<<<<< HEAD
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {selectCurrentUser} from '../../redux/user/user.selectors';
=======
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {selectCurrentUser} from '../../redux/user/user.selectors.js';
>>>>>>> d87835cf49f44dbea2b9c6a3554341b4695981e7
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
<<<<<<< HEAD
      
=======
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/analytics'>
        RESTAURANT ANALYTICS
      </Link>
>>>>>>> d87835cf49f44dbea2b9c6a3554341b4695981e7
      <Link className='option' to='/restaurant'>
        RESTAURANT
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
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
