import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import shopReducer from './shop/shop.reducer';
import directoryReducer from './directory/directory.reducer';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  shop: shopReducer,
  directory: directoryReducer,
  auth: authReducer,
  errors: errorReducer
});
