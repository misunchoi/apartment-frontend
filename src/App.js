import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Apartments from './pages/Apartments'
import Apartment from './pages/Apartment'

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/apartments" component={Apartments} />
          <Route path="/apartments/:id" component={Apartment} />
        </div>
      </Router>
    );
  }
}

export default App;
