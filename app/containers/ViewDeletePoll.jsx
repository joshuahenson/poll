import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { addSelectedPoll, deletePollRequest } from '../actions/polls';

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
    // TODO: Consider optimistic update of poll removal from redux first
    this.props.deletePollRequest(this.props.poll);
  }
  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="warning" onDismiss={this.dismissAlert}>
          <h4>Please confirm</h4>
          <p>Are you sure you want to delete this?</p>
          <hr />
          <ButtonToolbar>
            <Button bsStyle="danger" onClick={this.delete}>
              Delete
            </Button>
            <Button onClick={this.dismissAlert}>Cancel</Button>
          </ButtonToolbar>
        </Alert>
      );
    }
    return (
      <ButtonToolbar>
        <LinkContainer to={`/poll/${this.props.poll.slug}-${this.props.poll.cuid}`}>
          <Button
            bsSize="small"
            bsStyle="info"
            onClick={() => this.props.addSelectedPoll(this.props.poll)}>View Poll</Button>
        </LinkContainer>
        <Button bsSize="small" bsStyle="danger" onClick={this.setAlert}>Delete</Button>
      </ButtonToolbar>
    );
  }
}

AlertDelete.propTypes = {
  poll: PropTypes.object,
  addSelectedPoll: PropTypes.func.isRequired,
  deletePollRequest: PropTypes.func.isRequired
};

export default connect(null, { addSelectedPoll, deletePollRequest })(AlertDelete);
