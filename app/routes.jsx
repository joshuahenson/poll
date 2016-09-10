import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Polls from './containers/Polls';
import About from './components/About';
import Auth from './containers/Auth';
import Dashboard from './containers/Dashboard';
import PollDetail from './containers/PollDetail';
import CreatePoll from './containers/CreatePoll';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Polls} />
      <Route path="login" component={Auth} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="create_poll" component={CreatePoll} onEnter={requireAuth} />
      <Route path="about" component={About} />
      <Route path="/poll/:slug" component={PollDetail} />
    </Route>
  );
};
