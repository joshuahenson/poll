import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { addPollRequest } from '../actions/polls';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.options) {
    errors.options = 'Required';
  } else if (!/.,./.test(values.options)) {
    errors.options = 'At least two options separated by a comma are required';
  }
  return errors;
};

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit() {
    const { userName, userId, fields: { title, options }, addPollRequest } = this.props;
    const poll = {
      name: userName,
      userId,
      title: title.value,
      options: options.value.split(',').map(optionI => ({ option: optionI.trim() }))
    };
    addPollRequest(poll);
  }
  render() {
    const { fields: { title, options }, handleSubmit } = this.props; // reduxForm props
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className={`form-group ${title.touched && title.error ? 'has-error' : ''}`}>
          <label htmlFor="titleInput" className="control-label">Poll Title</label>
          <input id="titleInput" type="text" className="form-control" placeholder="Favorite Character"{...title} />
          {title.touched && title.error && <div className="help-block">{title.error}</div>}
        </div>
        <div className={`form-group ${options.touched && options.error ? 'has-error' : ''}`}>
          <label htmlFor="optionsInput" className="control-label">Poll Options (separated by comma)</label>
          <textarea
            id="optionsInput" className="form-control" rows="5" placeholder="Alana, Marko, Hazel" {...options}
          />
          {options.touched && options.error && <div className="help-block">{options.error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

CreatePoll.propTypes = {
  userName: PropTypes.string,
  userId: PropTypes.string,
  addPollRequest: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userId: state.user.userId
  };
}

export default reduxForm({
  form: 'addPoll',
  fields: ['title', 'options'],
  validate
}, mapStateToProps, { addPollRequest })(CreatePoll);
