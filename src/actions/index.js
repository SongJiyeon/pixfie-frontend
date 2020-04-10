import * as types from '../constants/actionTypes';

export const setPhoto = photo => {
  return {
    type: types.SET_PHOTO,
    photo
  };
};

export const setSignupInfo = signupInfo => {
  return {
    type: types.SET_SIGNUP_INFO,
    signupInfo
  };
};

export const setLoginInfo = loginInfo => {
  return {
    type: types.SET_LOGIN_INFO,
    loginInfo
  };
};

export const setSearchKeyword = keyword => {
  return {
    type: types.SET_SEARCH_KEYWORD,
    keyword
  };
};

export const setSearchResults = users => {
  return {
    type: types.SET_SEARCH_RESULTS,
    users
  };
};

export const setLoggedIn = loggedIn => {
  return {
    type: types.SET_LOGGED_IN,
    loggedIn
  };
};

export const setFaceLandmarks = faceLandmarks => {
  return {
    type: types.SET_FACE_LANDMARKS,
    faceLandmarks
  };
};
