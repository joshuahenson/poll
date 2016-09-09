import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { VictoryPie } from 'victory';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getPollRequest, vote, voteRequest, deletePollRequest } from '../actions/polls';

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
    // TODO: move delete to dashboard or provide other conditional before showing
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
          <div className="col-sm-6">
            <div className="well">
              <form>
                {this.props.poll.options.map((obj, i) =>
                  <div className="radio" key={i}>
                    <label>
                      <input
                        type="radio" name="option" onChange={this.radioClick} value={obj._id}
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
            </div>
            <div>
              <p>Current Results:</p>
              <ul>
              {this.props.poll.options.map((obj, i) =>
                <li key={i} style={{ color: colorScale[i] }}>{obj.option}: {obj.votes}</li>
              )}
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <VictoryPie
              data={pieData}
              style={{
                labels: {
                  fill: 'white',
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
          <LinkContainer to="/">
            <Button
              bsSize="small" bsStyle="danger"
              onClick={() => this.props.deletePollRequest(this.props.poll)}
            >
              Delete
            </Button>
          </LinkContainer>
        </div>
      </div>
    );
  }
}

PollDetail.need = [(params) => getPollRequest.bind(null, params.slug)()];

PollDetail.propTypes = {
  poll: PropTypes.object,
  getPollRequest: PropTypes.func,
  vote: PropTypes.func,
  voteRequest: PropTypes.func
};

function mapStateToProps(store) {
  return {
    poll: (store.poll)
  };
}

export default connect(mapStateToProps, { getPollRequest, vote, voteRequest, deletePollRequest })(PollDetail);
