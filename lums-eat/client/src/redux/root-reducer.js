import { combineReducers } from 'redux';

import {persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';

const persistConfig ={
  key : 'root',
  storage,
  whitelist : ['cart', 'user']
}

const rootReducer=  combineReducers({
  user: userReducer,
  cart: cartReducer,
 
  auth: authReducer,
  errors: errorReducer
});


export default persistReducer(persistConfig, rootReducer);