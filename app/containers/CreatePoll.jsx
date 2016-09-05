import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { addPollRequest } from '../actions/polls';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
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

class AddPollForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit() {
    const { fields: { name, title, options } } = this.props;
    const poll = {
      name: name.value,
      title: title.value,
      options: options.value.split(',').map(optionI => ({ option: optionI.trim() }))
    };
    this.props.dispatch(addPollRequest(poll));
  }
  render() {
    const { fields: { name, title, options }, handleSubmit } = this.props; // reduxForm props
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className={`form-group ${name.touched && name.error ? 'has-error' : ''}`}>
          <label htmlFor="nameInput" className="control-label">Name later replaced by login</label>
          <input id="nameInput" type="text" className="form-control" placeholder="Fiona Staples"{...name} />
          {name.touched && name.error && <div className="help-block">{name.error}</div>}
        </div>
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

AddPollForm.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object
};

export default reduxForm({
  form: 'addPoll',
  fields: ['name', 'title', 'options'],
  validate
})(AddPollForm);
