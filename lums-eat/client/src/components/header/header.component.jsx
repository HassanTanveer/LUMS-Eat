import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';
// import PropTypes from "prop-types";
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {ReactComponent as Logo } from '../../assets/logo.svg';
import { setUserLoading } from "../../redux/actions/authActions";
import './header.styles.scss';
import 'react-notifications/lib/notifications.css';
// import { logoutUser } from "../../redux/actions/authActions";
import Logout from '../../components/logout/logout';

console.log(localStorage.isRest)


const Header = ({ currentUser, hidden, check }) => {

  let button

  console.log(localStorage)
  
    if( !localStorage.isRest) {
      if(localStorage.email) {
        button=  <Link className='option' to='/orders'>
        ORDERS
      </Link>} 
      else{
        button= <Link className='option' to='/login'>
        ORDERS
      </Link>  
      }
    }
       
  return(
  <div className='header'>
    {localStorage.isRest ? (
      <Link className='logo-container' to='/restaurant'>
        <Logo className='logo' />
        <Link className='title1' to='/restaurant'>{"  "} </Link>
        <Link className='title1' to='/restaurant'>{"LUMS"}</Link>
        <Link className='title' to='/restaurant'>{"EAT"}</Link>
      </Link>) : (
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
        <Link className='title1' to='/'>{"  "} </Link>
        <Link className='title1' to='/'>{"LUMS"}</Link>
        <Link className='title' to='/'>{"EAT"}</Link>
      </Link>
    )}

    <div className='options'>
      {button}

      {localStorage.isRest ?(
      <Link className='option' to='/analytics'>
        RESTAURANT ANALYTICS
      </Link>
      ) : 
      (console.log('Not rest')) }
      
      {localStorage.isRest ?(
      <Link className='option' to='/restaurant'>
        RESTAURANT
      </Link>
      ) : 
      (console.log('Not rest')) }

      
      {localStorage.isRest ?(
      <Link className='option' to='/menu-update'>
        MENU AVAILABILITY
      </Link>
      ) : 
      (console.log('Not rest')) } 

      {localStorage.isRest ?(
      <Link className='option' to='/feedback'>
        FEEDBACK
      </Link>
      ) : 
      (console.log('Not rest')) }  

     
      {localStorage.isRest ?(
      <Link className='option' to='/add-menu'>
        ADD
      </Link>
      ) : 
      (console.log('Not rest')) }
     {localStorage.email ? (
       <Logout />
     ):
     (
      <Link className='option' to='/login'>
      LOGIN
    </Link>

     )}

    
    {localStorage.isRest ?(
      (console.log('Not rest'))
      ) : 
      <CartIcon />
    }
      
    </div>
    
   
    {hidden ? null : <CartDropdown />}
  </div>

  )
};



// Header.propTypes = {
//   auth: PropTypes.object.isRequired,
  
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   hidden: selectCartHidden
// })

const mapStateToProps = createStructuredSelector({
  currentUser:setUserLoading,
  hidden: selectCartHidden,
})



export default connect(mapStateToProps)(Header);
