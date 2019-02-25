import React, { Component } from 'react';
import {Navbar, Brand, Nav, NavItem } from 'react-bootstrap';
import AuthService from '../services'

class Header extends Component {
  constructor(props){
    super(props)
      this.auth = new AuthService()
    }

  render () {
    // navbar if logged IN//
      if (this.props.auth.loggedIn()) {
        return(
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Apartment Hunters</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/apartments">
                  All Apartments
                </NavItem>
                <NavItem eventKey={2} href="/apartments/new">
                  Create Apartment
                </NavItem>
                <NavItem eventKey={2} href="/users/:id/apartments">
                  My Apartments
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem onClick={this.logout} eventKey={2} href="/">
                  Logout
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
      // navbar if NOT logged in//
      } else {
        return(
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Apartment Hunters</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/apartments">
                  All Apartments
                </NavItem>

              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="/login">
                  LogIn
                </NavItem>
                <NavItem eventKey={2} href="/users/new">
                  Register
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
      }
  }

  logout = () => {
    this.auth.logout()
    this.props.logout()
  }

}

export default Header;
