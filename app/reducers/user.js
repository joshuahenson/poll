import { combineReducers } from 'redux';
import * as types from '../types';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.IS_WAITING:
      return true;
    case types.IS_NOT_WAITING:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const userName = (
  state = null,
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return null;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return action.userName;
    default:
      return state;
  }
};

const userId = (
  state = null,
  action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS_USER:
      return null;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return action.userId;
    default:
      return state;
  }
};

const userPolls = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.ADD_USER_POLLS :
      return action.polls;

    case types.LOGOUT_SUCCESS_USER:
      return [];

    case types.DELETE_POLL :
      return state.filter((poll) => poll._id !== action.poll._id);

    default:
      return state;
  }
};

const submittingGoogle = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GOOGLE_LOGIN_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  authenticated,
  isLogin,
  isWaiting,
  submittingGoogle,
  userName,
  userId,
  userPolls
});

export default userReducer;
