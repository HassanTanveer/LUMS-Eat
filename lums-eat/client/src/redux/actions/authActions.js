import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const orders = (newOrder, history) => dispatch => {
  axios
    .post("/orders/add", newOrder)
    .then(res => history.push("/orders")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      console.log(res.data)
      const { token } = res.data; 
      const { email } = res.data;
      const { userID } = res.data;
      const { name } = res.data;
      const { isRest } = res.data;
      const { restID } = res.data;
      const { address } = res.data;
      const { number } = res.data;

      // console.log("isRest", isRest)
      if(isRest){
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("RestaurantID", restID);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        localStorage.setItem("isRest", isRest);
      }
      else{
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        localStorage.setItem("address", address);
        localStorage.setItem("number", number);
      }
      


      console.log(localStorage)
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => new Promise ((resolve, reject) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("userID");
  localStorage.removeItem("isRest");
  localStorage.removeItem("RestaurantID");
  localStorage.removeItem("address");
  localStorage.removeItem("number");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  resolve("done")
});