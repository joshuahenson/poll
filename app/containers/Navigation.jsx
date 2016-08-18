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
          <Nav>
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
          { user.authenticated ? ([
            <LinkContainer key="dashboard" to="/dashboard">
              <NavItem>Dashboard</NavItem>
            </LinkContainer>,
            <LinkContainer key="logout" active={false} onClick={logOut} to="/">
              <NavItem>Logout</NavItem>
            </LinkContainer>
          ]) : (
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
          )}
          </Nav>
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
