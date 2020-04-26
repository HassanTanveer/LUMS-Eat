import React from 'react';
import SignIn from '../../components/sign-in/sign-in.components.jsx';

import './sign-in-and-sign-up.styles.scss'

import SignUp from '../../components/sign-up/sign-up.component.jsx';


const SignInAndSignUpPage = () => (

    <div className='sign-in-and-sign-up'> 
    <SignIn />
     <SignUp />
    </div>

)

export default SignInAndSignUpPage;