import { polyfill } from 'es6-promise';
import axios from 'axios';
import { push } from 'react-router-redux';
import { startSubmit, stopSubmit } from 'redux-form';
import { dismissMessage } from './messages';

import * as types from '../types';

polyfill();

const getMessage = res => res.response.data.message;

// Log In Action Creators
export function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

export function googleLogin() {
  return { type: types.GOOGLE_LOGIN_USER };
}

export function loginSuccess(message, userName, userId) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    userName,
    userId
  };
}

export function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

// Sign Up Action Creators
export function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

export function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

export function signUpSuccess(message, userName, userId) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message,
    userName,
    userId
  };
}

// Log Out Action Creators
export function beginLogout() {
  return { type: types.LOGOUT_USER};
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

export function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function addUserPolls(polls) {
  return {
    type: types.ADD_USER_POLLS,
    polls
  };
}

export function getUserPollsRequest(userId) {
  return dispatch => {
    return axios.get(`/getUserPolls?ID=${userId}`)
      .then(response => dispatch(addUserPolls(response.data.polls)));
  };
}

export function manualLogin(data, form) {
  return dispatch => {
    dispatch(startSubmit(form));

    return axios.post('/login', data)
      .then(response => {
        dispatch(loginSuccess(response.data.message, response.data.userName, response.data.userId));
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
        dispatch(push('/dashboard'));
        dispatch(stopSubmit(form, {}));
      })
      .catch(err => {
        // TODO: decide if I want to dispatch error message or use with stopSubmit
        // dispatch(loginError(getMessage(err)));
        dispatch(stopSubmit(form, {_error: getMessage(err)}));
      });
  };
}

export function signUp(data, form) {
  return dispatch => {
    dispatch(startSubmit(form));

    return axios.post('/signup', data)
      .then(response => {
        dispatch(signUpSuccess(response.data.message, response.data.userName, response.data.userId));
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
        dispatch(push('/dashboard'));
        dispatch(stopSubmit(form, {}));
      })
      .catch(err => {
        dispatch(stopSubmit(form, {_error: getMessage(err)}));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return axios.post('/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}
