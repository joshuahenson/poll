import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { deletePollRequest } from '../actions/polls';
import Tweet from '../components/Tweet';

class AlertDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {alertVisible: false};
    this.dismissAlert = this.dismissAlert.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.delete = this.delete.bind(this);
  }
  setAlert() {
    this.setState({alertVisible: true});
  }
  dismissAlert() {
    this.setState({alertVisible: false});
  }
  delete() {
    this.props.deletePollRequest(this.props.poll);
  }
  render() {
    const {user, poll} = this.props;
    if (this.state.alertVisible && user.userId === poll.userId) {
      return (
        <Alert bsStyle="warning" onDismiss={this.dismissAlert}>
          <h4>Please confirm</h4>
          <p>Are you sure you want to delete this?</p>
          <hr />
          <ButtonToolbar>
            <LinkContainer to="/">
              <Button
                bsStyle="danger"
                onClick={this.delete}
              >
                Delete
              </Button>
            </LinkContainer>
            <Button onClick={this.dismissAlert}>Cancel</Button>
          </ButtonToolbar>
        </Alert>
      );
    } else if (user.userId === poll.userId) {
      return (
        <ButtonToolbar>
          <Tweet />
          <Button bsStyle="danger" onClick={this.setAlert}>Delete Poll</Button>
        </ButtonToolbar>
      );
    }
    return <Tweet />;
  }
}

AlertDelete.propTypes = {
  poll: PropTypes.object,
  user: PropTypes.object,
  deletePollRequest: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    poll: state.poll,
    user: state.user
  };
}

export default connect(mapStateToProps, { deletePollRequest })(AlertDelete);
