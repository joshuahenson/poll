import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
        <LinkContainer to="/create_poll">
          <Button block>Create a poll</Button>
        </LinkContainer>
      </div>
    </div>
  );
};

export default Dashboard;
