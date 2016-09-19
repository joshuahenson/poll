import { polyfill } from 'es6-promise';
import axios from 'axios';
import { push } from 'react-router-redux';
import { dismissMessage } from './messages';
import * as types from '../types';

polyfill();

export function generalErrorMessage() {
  return {
    type: types.GENERAL_ERROR_MESSAGE,
    message: 'Unfortunately, an error has occurred'
  };
}

export function addPoll(poll) {
  return {
    type: types.ADD_POLL,
    name: poll.name,
    userId: poll.userId,
    title: poll.title,
    options: poll.options,
    slug: poll.slug,
    cuid: poll.cuid,
    _id: poll._id
  };
}

export function addPollRequest(poll) {
  return (dispatch) => {
    return axios.post('/addPoll', poll)
    .then(res => {
      dispatch(addPoll(res.data));
      dispatch(push(`/poll/${res.data.slug}-${res.data.cuid}`));
    })
    .catch(() => {
      dispatch(generalErrorMessage());
      setTimeout(() => {
        dispatch(dismissMessage());
      }, 5000);
    });
  };
}

export function addSelectedPoll(poll) {
  return {
    type: types.ADD_SELECTED_POLL,
    poll,
  };
}

export function getPollRequest(poll) {
  return (dispatch) => {
    return axios.get(`/getPoll?slug=${poll}`)
      .then(res => dispatch(addSelectedPoll(res.data.poll)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function addPolls(polls) {
  return {
    type: types.ADD_POLLS,
    polls
  };
}

export function fetchPolls() {
  return (dispatch) => {
    return axios.get('/getPolls')
      .then(res => dispatch(addPolls(res.data.polls)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function addIpVote(ip) {
  return {
    type: types.ADD_IP_VOTE,
    ip
  };
}

export function addAuthVote(userId) {
  return {
    type: types.ADD_AUTH_VOTE,
    userId
  };
}

export function vote(pollId, optionId) {
  return {
    type: types.VOTE,
    pollId,
    optionId
  };
}

export function undoVote(pollId, optionId) {
  return {
    type: types.UNDO_VOTE,
    pollId,
    optionId
  };
}

export function voteRequest(pollId, optionId, userId) {
  return dispatch => {
    dispatch(vote(pollId, optionId));
    return axios.post('/vote', {pollId, optionId, userId})
      .then()
      .catch(() => {
        dispatch(undoVote(pollId, optionId));
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function deletePoll(poll) {
  return {
    type: types.DELETE_POLL,
    poll,
  };
}

export function deletePollRequest(poll) {
  return (dispatch) => {
    return axios.post('/deletePoll', {pollId: poll._id})
      .then(() => dispatch(deletePoll(poll)))
      .catch(() => {
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}
