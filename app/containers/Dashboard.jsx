import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Accordion, Panel } from 'react-bootstrap';
import { getUserPollsRequest } from '../actions/users';
import { } from '../actions/polls';
import ViewDeletePoll from '../containers/ViewDeletePoll';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserPollsRequest(this.props.userId);
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <LinkContainer to="/create_poll">
            <Button bsSize="large" bsStyle="primary" block>Create a poll</Button>
          </LinkContainer>
          <hr />
          <Accordion>
            {this.props.userPolls.map((poll, index) =>
              <Panel header={poll.title} eventKey={index} key={index}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Poll Options</th>
                      <th>Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poll.options.map((option, index) =>
                      <tr key={index}>
                        <td>{option.option}</td>
                        <td>{option.votes}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <ViewDeletePoll poll={poll} />
              </Panel>
            )}
          </Accordion>
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
