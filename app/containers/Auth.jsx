import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';


const Auth = ({ isLogin }) => {
  return (isLogin ? <Login /> : <Register />);
};

Auth.propTypes = {
  isLogin: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isLogin: state.user.isLogin
  };
}

export default connect(mapStateToProps)(Auth);
