import { polyfill } from 'es6-promise';
import axios from 'axios';
import * as types from '../types';

polyfill();

export function addPoll(poll) {
  return {
    type: types.ADD_POLL,
    name: poll.name,
    title: poll.title,
    options: poll.options,
    slug: poll.slug,
    cuid: poll.cuid,
    _id: poll._id,
  };
}

export function addPollRequest(poll) {
  return (dispatch) => {
    // TODO: check for duplicates?
    // TODO: First dispatch an optimistic update?
    // TODO: add catch
    return axios.post('/addPoll', poll)
    .then(res => dispatch(addPoll(res.data)));
  };
}
