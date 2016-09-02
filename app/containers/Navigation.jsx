import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logOut } from '../actions/users';

const Navigation = ({ user, logOut }) => {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Pollster</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { user.authenticated ? ([
            <Nav key="left">
              <LinkContainer to="/about">
                <NavItem>About</NavItem>
              </LinkContainer>
              <LinkContainer to="/dashboard">
                <NavItem>Dashboard</NavItem>
              </LinkContainer>
            </Nav>,
            <Nav pullRight key="right">
              <LinkContainer active={false} onClick={logOut} to="/">
                <NavItem>Logout</NavItem>
              </LinkContainer>
            </Nav>
          ]) : ([
            <Nav key="left">
              <LinkContainer to="/about">
                <NavItem>About</NavItem>
              </LinkContainer>
            </Nav>,
            <Nav pullRight key="right">
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </Nav>
          ])}
        </Navbar.Collapse>
      </Navbar>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut }, null, { pure: false })(Navigation);
