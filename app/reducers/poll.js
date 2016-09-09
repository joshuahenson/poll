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

const poll = (state = null, action) => {
  switch (action.type) {
    case types.CHANGE_SELECTED_POLL :
      return action.slug;

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
