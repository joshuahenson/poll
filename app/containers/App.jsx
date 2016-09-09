import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Navigation from './Navigation';
import Message from './Message';


/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({children}) => {
  return (
    <div>
      <Helmet
        title="Pollster"
        titleTemplate="%s - Universal React Example"
      />
      <Navigation />
      <Message />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
