import React, { Component } from 'react';
import './App.css';

import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Apartments from './pages/Apartments';
import Apartment from './pages/Apartment';
import Login from './pages/Login';
import CreateApartment from './pages/CreateApartment';
import UsersApartments from './pages/UsersApartments';
import EditApartment from './pages/EditApartment';

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
      <div className="site">
        <Header logout={this.authStatusUpdate} auth={this.auth} authenticated={this.authenticated}/>

        <Router>
          <div className="site-content">
            {(this.auth.loggedIn())
  					// if logged in
  					? <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/apartments/new" component={CreateApartment} />
              <Route exact path="/apartments" component={Apartments} />
              <Route exact path="/apartments/:id" component={Apartment} />
              <Route exact path="/users/:id/apartments" render={(routeProps) => (
                <UsersApartments refresh={this.refresh} {...routeProps} />
              )} />
              <Route exact path="/apartments/:id/edit" render={(routeProps) => (
                <EditApartment refresh={this.refresh} {...routeProps} />
              )} />

              <Redirect path="/users/new" to="/apartments" />
              <Redirect path="/login" to="/apartments" />


  					</Switch>
  					// if not logged in (ie Guest User)
  					: <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/apartments" component={Apartments} />
              <Redirect exact path="/apartments/new" to="/login" />
              <Route exact path="/login" render={(routeProps) => (
                <Login refresh={this.refresh} {...routeProps} />
              )} />
              <Route path="/apartments/:id" component={Apartment} />
              <Route path="/users/new" render={(routeProps) => (
                <Register refresh={this.refresh} {...routeProps} />
              )} />

  					</Switch>}
          </div>
        </Router>
        <Footer className="footer"/>
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
