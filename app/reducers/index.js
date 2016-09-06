import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import user from './user';
import topic from './topic';
import message from './message';
import polls from './polls';
import poll from './poll';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  polls,
  poll,
  topic,
  message,
  routing,
  form: formReducer
});

export default rootReducer;
