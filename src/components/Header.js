import React, { Component } from 'react';
import AuthService from '../services'

class Header extends Component {
  constructor(props){
    super(props)
      this.auth = new AuthService()
      this.state = {
        toggle: 'collapse navbar-collapse'
      }
  }

  handleToggle = () => {
    if (this.state.toggle === 'collapse navbar-collapse') {
      this.setState({
        toggle: 'collapse navbar-collapse show'
      })
    } else if (this.state.toggle === 'collapse navbar-collapse show') {
      this.setState({
        toggle: 'collapse navbar-collapse'
      })
    }
  }

  render () {
    // navbar if logged IN//
      if (this.props.auth.loggedIn()) {
        return(
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Apartment App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation" onClick={this.handleToggle}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={this.state.toggle} id="navbarColor01">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/apartments"> All Apartments </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/apartments/new">Create Apartment</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users/:id/apartments">My Apartments</a>
                </li>
              </ul>
              <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item">
                  <a className="nav-link" onClick={this.logout} href="/">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
        )
      // navbar if NOT logged in//
      } else {
        return(
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Apartment Hunters</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation" onClick={this.handleToggle}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={this.state.toggle} id="navbarColor01">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/apartments"> All Apartments </a>
                </li>
              </ul>
              <ul className="navbar-nav my-2 my-lg-0">
                <a className="nav-link mr-sm-2" href="/login">Login</a>
                <a className="nav-link my-2 my-sm-0" href="/users/new">Register</a>
              </ul>
            </div>
          </nav>
        )
      }
  }

  logout = () => {
    this.auth.logout()
    this.props.logout()
  }

}

export default Header;
