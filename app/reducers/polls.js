import * as types from '../types';

const polls = (state = [], action) => {
  switch (action.type) {
    case types.ADD_POLL :
      return [{
        name: action.name,
        title: action.title,
        options: action.options,
        slug: action.slug,
        cuid: action.cuid,
        _id: action._id,
      }, ...state];

    case types.ADD_POLLS :
      return action.polls;

    case types.DELETE_POLL :
      return state.filter((poll) => poll._id !== action.poll._id);

    default:
      return state;
  }
};

export default polls;
