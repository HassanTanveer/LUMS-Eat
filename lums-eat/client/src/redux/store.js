import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
import thunk from "redux-thunk";

import rootReducer from './root-reducer';

const initialState = {};
// const middlewares = [logger];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;


// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducers";
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
// rootReducer,
// initialState,
// composeEnhancer(applyMiddleware(thunk))
// );
// export default store;