import * as types from '../types';

const updateOptions = (state, action) => {
  switch (action.type) {
    case types.VOTE:
      if (state._id !== action.optionId) {
        return state;
      }
      return Object.assign({}, state, {
        votes: state.votes + 1
      });
    default:
      return state;
  }
};

// Needs some basic info to keep from showing error when pushing to newly created poll
const poll = (state = {options: [{option: '', votes: 0}]}, action) => {
  switch (action.type) {
    case types.ADD_SELECTED_POLL :
      return action.poll;

    case types.VOTE:
          return Object.assign({}, state, {
            options: state.options.map(t =>
              updateOptions(t, action)
            )
          });
    default:
      return state;
  }
};

export default poll;
