import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';
// import PropTypes from "prop-types";
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {ReactComponent as Logo } from '../../assets/logo.svg';
import { setUserLoading, logoutUser } from "../../redux/actions/authActions";
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
      <Link className='option' to='/feedback'>
         FEEDBACK
      </Link>
      <Link className='option' to='/orders'>
        ORDERS
      </Link>
      <Link className='option' to='/add-menu'>
        ADD MENU
      </Link>
      {currentUser ? (
        <div className='option' onClick = {() => logoutUser()}>
          LOG OUT
        </div>
      ) : (
        <Link className='option' to='/login'>
          LOGIN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);



// Header.propTypes = {
//   auth: PropTypes.object.isRequired,
  
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   hidden: selectCartHidden
// })

const mapStateToProps = createStructuredSelector({
  currentUser:setUserLoading,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
