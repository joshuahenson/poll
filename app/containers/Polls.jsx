import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addSelectedPoll, fetchPolls } from '../actions/polls';

class Polls extends Component {
  render() {
    const { addSelectedPoll, polls } = this.props;
    return (
      <div className="row">
        {polls.map((poll, i) => (
          <div className="col-sm-6 col-md-4 text-center" key={i}>
            <Link
              to={`/poll/${poll.slug}-${poll.cuid}`}
              onClick={() => addSelectedPoll(poll)}
            >
              <div className=" panel">
                <div className="panel-body" >
                  <h3>
                    {poll.title}
                  </h3>
                  <p>By {poll.name}</p>
                </div>
              </div>
            </Link>
          </div>
          ))}
      </div>
    );
  }
}

// Data that needs to be called before rendering the component
// This is used for server side rending via the fetchComponentDataBeforeRender() method
Polls.need = [
  fetchPolls
];

Polls.propTypes = {
  polls: PropTypes.array,
  addSelectedPoll: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    polls: state.polls
  };
}

export default connect(mapStateToProps, { addSelectedPoll, fetchPolls })(Polls);
