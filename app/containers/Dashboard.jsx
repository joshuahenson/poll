import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { getUserPollsRequest } from '../actions/users';


class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserPollsRequest(this.props.userId);
  }
  render() {
    // TODO: update userPolls.map placeholder
    return (
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <LinkContainer to="/create_poll">
            <Button block>Create a poll</Button>
          </LinkContainer>
          <div>
            {this.props.userPolls.map((poll, index) => <p key={index}>{poll.title}</p>)}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getUserPollsRequest: PropTypes.func.isRequired,
  userId: PropTypes.string,
  userPolls: PropTypes.array
};

function mapStateToProps(state) {
  return {
    userId: state.user.userId,
    userPolls: state.user.userPolls
  };
}

export default connect(mapStateToProps, { getUserPollsRequest })(Dashboard);
