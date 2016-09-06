import * as types from '../types';

const poll = (state = null, action) => {
  switch (action.type) {
    case types.CHANGE_SELECTED_POLL :
      return action.slug;

    case types.ADD_SELECTED_POLL :
      return action.poll;

    default:
      return state;
  }
};

export default poll;
