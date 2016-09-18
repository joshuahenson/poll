import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { VictoryPie } from 'victory';
import { Button } from 'react-bootstrap';
import { getPollRequest, vote, voteRequest, deletePollRequest } from '../actions/polls';
import DeletePoll from './DeletePoll';

class PollDetail extends Component {
  constructor(props) {
    super(props);
    this.radioClick = this.radioClick.bind(this);
    this.vote = this.vote.bind(this);
    this.state = { vote: null };
  }
  radioClick(e) {
    this.setState({ vote: e.target.value });
  }
  vote(e) {
    e.preventDefault();
    // testing separate reducer and async actions
    this.props.vote(this.props.poll._id, this.state.vote);
    this.props.voteRequest(this.props.poll._id, this.state.vote);
  }
  render() {
    const pieData = this.props.poll.options.map((obj) => (
      {
        x: obj.option,
        y: obj.votes,
      }
    ));
    const colorScale = ['#75C776', '#39B6C5', '#78CCC4',
      '#62C3A4', '#64A8D1', '#8C95C8', '#3BAF74'];
    // TODO: 8th item will put two colors next to one another
    // TODO: 8th item will not have color on checkboxes/current results
    return (
      <div>
        <div className="row p-b">
          <div className="col-xs-12 text-center">
            <h3>{this.props.poll.title}<small> by {this.props.poll.name}</small></h3>
          </div>
        </div>
        <div className="row">
          <Helmet title={this.props.poll.title} />
          <div className="col-sm-6">
            <div className="well">
              <form>
                {this.props.poll.options.map((obj, i) =>
                  <div className="radio" key={i}>
                    <label htmlFor={`option${i}`}>
                      <input
                        type="radio" name="option" id={`option${i}`} onChange={this.radioClick} value={obj._id}
                      />
                      <span className="glyphicon glyphicon-unchecked" aria-hidden="true" />
                      <span
                        style={{
                          color: colorScale[i]
                        }}
                        className="glyphicon glyphicon-check" aria-hidden="true"
                      />
                      {obj.option}
                    </label>
                  </div>
                )}
                <Button bsStyle="primary" onClick={this.vote} block>
                  Vote
                </Button>
              </form>
              <hr />
              <h5>Current Results</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Poll Options</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.poll.options.map((option, index) =>
                    <tr key={index} style={{ backgroundColor: colorScale[index]}}>
                      <td>{option.option}</td>
                      <td>{option.votes}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <DeletePoll />
          </div>
          <div className="col-sm-6">
            <VictoryPie
              data={pieData}
              style={{
                labels: {
                  opacity: data => (data.y === 0 ? 0 : 1)
                },
                data: {
                  stroke: 'none'
                }
              }}
              animate={{
                duration: 1000
              }}
              colorScale={colorScale}
            />
          </div>
        </div>
      </div>
    );
  }
}

PollDetail.need = [(params) => getPollRequest.bind(null, params.slug)()];

PollDetail.propTypes = {
  poll: PropTypes.object,
  getPollRequest: PropTypes.func,
  deletePollRequest: PropTypes.func,
  vote: PropTypes.func,
  voteRequest: PropTypes.func
};

function mapStateToProps(store) {
  return {
    poll: (store.poll)
  };
}

export default connect(mapStateToProps, { getPollRequest, vote, voteRequest, deletePollRequest })(PollDetail);
