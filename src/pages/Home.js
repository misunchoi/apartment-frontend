import React, { Component } from 'react';

class Home extends Component {

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">This Apartment App was made using React.js and Ruby on Rails</p>
          <hr className="my-4"/>
          <p>Explore different apartments and create your own!</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="/apartments" role="button">Explore Apartments</a>
            <br/>
            <br/>
            <a className="btn btn-primary btn-lg" href="/apartments/new" role="button">Create Apartment</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
