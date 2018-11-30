import React, { Component } from 'react';
import './App.css';

import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Register from './pages/Register';
import Apartments from './pages/Apartments';
import Apartment from './pages/Apartment';
import Login from './pages/Login';
import CreateApartment from './pages/CreateApartment';
import UsersApartments from './pages/UsersApartments';

import AuthService from './services'

class App extends Component {
  constructor(props) {
		super(props)

		this.auth = new AuthService()
		this.state = {
			authenticated: this.auth.loggedIn()
		}
	}

  render() {
    return (
      <div>
        <Header logout={this.authStatusUpdate} auth={this.auth} authenticated={this.authenticated}/>
        <Router>
          <div>
            {(this.auth.loggedIn())
  					// if logged in
  					? <Switch>
              <Route exact path="/apartments/new" component={CreateApartment} />
              <Route exact path="/apartments" component={Apartments} />
              <Route exact path="/apartments/:id" component={Apartment} />
              <Route exact path="/users/:id/apartments" component={UsersApartments} />
              <Redirect path="/users/new" to="/apartments" />
              <Redirect path="/login" to="/apartments" />


  					</Switch>
  					// if not logged in (ie Guest User)
  					: <Switch>
              <Route exact path="/apartments" component={Apartments} />
              <Redirect exact path="/apartments/new" to="/login" />
              <Route exact path="/login" render={(routeProps) => (
                <Login refresh={this.refresh} {...routeProps} />         )} />
              <Route path="/apartments/:id" component={Apartment} />
              <Route path="/users/new" render={(routeProps) => (
                <Register refresh={this.refresh} {...routeProps} />
              )} />

  					</Switch>}
          </div>
        </Router>
      </div>
    );
  }

  refresh = () => {
    this.setState ({
      authenticated: this.auth.loggedIn()
    })
  }

  authStatusUpdate = () => {
    this.setState({
      authenticated: this.auth.loggedIn()
    })
  }

}

export default App;
