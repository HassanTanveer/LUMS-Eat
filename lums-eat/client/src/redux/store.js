import { createStore, applyMiddleware, compose } from 'redux';

import thunk from "redux-thunk";
import {persistStore} from 'redux-persist';

import rootReducer from './root-reducer';

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

//export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor= persistStore(store);

export default {store, persistor}



// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducers";
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
// rootReducer,
// initialState,
// composeEnhancer(applyMiddleware(thunk))
// );
// export default store;