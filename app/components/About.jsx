import React from 'react';

const About = () => {
  return (
    <div>
      <h6>
        A sample project built by <a href="https://github.com/joshuahenson">Joshua Henson</a> for improving development skills using universal React while implementing the following user stories.
      </h6>
      <ul className="list-unstyled">
        <li>User Story: As an authenticated user, I can keep my polls and come back later to access them.</li>
        <li>User Story: As an authenticated user, I can share my polls with my friends.</li>
        <li>User Story: As an authenticated user, I can see the aggregate results of my polls.</li>
        <li>User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.</li>
        <li>User Story: As an authenticated user, I can create a poll with any number of possible items.</li>
        <li>User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.</li>
        <li>User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form.</li>
      </ul>

    </div>
  );
};

export default About;
