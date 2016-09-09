import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { dismissMessage } from '../actions/messages';

class Message extends Component {
  render() {
    const { message, msgType } = this.props;
    return (
      message ?
        <Alert bsStyle={msgType} onDismiss={() => this.props.dismissMessage()}>
          <p>{message}</p>
        </Alert>
      : null
    );
  }
}

Message.propTypes = {
  message: PropTypes.string,
  msgType: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    message: state.message.message,
    msgType: state.message.type
  };
}

export default connect(mapStateToProps, { dismissMessage })(Message);
