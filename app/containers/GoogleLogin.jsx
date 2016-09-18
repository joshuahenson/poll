import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { googleLogin } from '../actions/users';

const GoogleLogin = ({ submittingGoogle, googleLogin }) => {
  return (
    <div className="text-center">
      <h2>Log in with:</h2>
      <a className="btn btn-danger btn-lg" href="/auth/google" onClick={googleLogin}>
        {submittingGoogle ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-google" />} Google
      </a>
    </div>
  );
};

GoogleLogin.propTypes = {
  submittingGoogle: PropTypes.bool,
  googleLogin: PropTypes.func
};

function mapStateToProps(state) {
  return {
    submittingGoogle: state.user.submittingGoogle
  };
}

export default connect(mapStateToProps, {googleLogin})(GoogleLogin);
