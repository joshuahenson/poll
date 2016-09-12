import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

const AlertDelete = () => {
  return (
    <ButtonToolbar>
      <Button bsSize="small">View Poll</Button>
      <Button bsSize="small" bsStyle="danger">Delete</Button>
    </ButtonToolbar>
  );
};

export default AlertDelete;
