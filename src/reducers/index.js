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

const initialSearchedUser = {
  _id: '',
  user_id: '',
  user_name: '',
  profile_url: '',
  photos: [],
  followers: [],
  followings: []
};

const searchedUser = (state = initialSearchedUser, action) => {
  switch(action.type) {
    case types.SET_SEARCHED_USER:
      return action.user;
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

const userPortraits = (state = [], action) => {
  switch(action.type) {
    case types.SET_USER_PORTRAITS:
      return action.userPortraits;
    default:
      return state;
  };
};

const initialFaceType = {
  face: 0,
  eyebrows: 0,
  eyes: 0,
  nose: 0,
  lip: 0
};

const faceType = (state = initialFaceType, action) => {
  switch(action.type) {
    case types.SET_FACE_TYPE:
      return action.faceType;
    default:
      return state;
  };
};

const initialOptionTheme = {
  name: 'face color',
  id: 'faceColor',
  options: [
    ['#FFDBAC', '#ee8862'],
    ['#F3B780', '#ee8862'], 
    ['#8D5524', '#30150e']
  ]
};;

const optionTheme = (state = initialOptionTheme, action) => {
  switch(action.type) {
    case types.SET_OPTION_THEME:
      return action.optionTheme;
    default:
      return state;
  };
};

const currentOption = (state = 0, action) => {
  switch(action.type) {
    case types.SET_CURRENT_OPTION:
      return action.currentOption;
    default:
      return state;
  };
};

const initialDropdownStatus = {
  status: false,
  position: {},
  item: {}
};

const dropdownStatus = (state = initialDropdownStatus, action) => {
  switch(action.type) {
    case types.SET_DROPDOWN_STATUS:
      return action.dropdownStatus;
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
  searchedUser,
  loggedIn,
  userPortraits,
  faceType,
  optionTheme,
  currentOption,
  dropdownStatus
});
