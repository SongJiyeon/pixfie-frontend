import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

const photo = (state = {}, action) => {
  switch(action.type) {
    case types.SET_PHOTO:
      return action.photo;
    default:
      return state;
  };
};

const initialSignupState = {
  user_id: '',
  user_name: '',
  password: '',
  passwordCheck: ''
};

const signupInfo = (state = initialSignupState, action) => {
  switch(action.type) {
    case types.SET_SIGNUP_INFO:
      return { ...state, ...action.signupInfo };
    default:
      return state;
  };
};

const initialLoginState = {
  user_id: '',
  password: ''
};

const loginInfo = (state = initialLoginState, action) => {
  switch(action.type) {
    case types.SET_LOGIN_INFO:
      return { ...state, ...action.loginInfo };
    default:
      return state;
  };
};

const keyword = (state = '', action) => {
  switch(action.type) {
    case types.SET_SEARCH_KEYWORD:
      return action.keyword;
    default:
      return state;
  };
};

const users = (state = [], action) => {
  switch(action.type) {
    case types.SET_SEARCH_RESULTS:
      return action.users;
    default:
      return state;
  };
};

const initialLoggedIn = {
  status: false,
  user: {}
};

const loggedIn = (state = initialLoggedIn, action) => {
  switch(action.type) {
    case types.SET_LOGGED_IN:
      return action.loggedIn;
    default:
      return state;
  };
};

export default combineReducers({
  photo,
  signupInfo,
  loginInfo,
  keyword,
  users,
  loggedIn
});
