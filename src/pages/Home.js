import React, { Component } from 'react';

class Home extends Component {

  render() {
    return (
      <div>
        <div class="jumbotron">
          <h1 class="display-3">Welcome!</h1>
          <p class="lead">This Apartment App was made using React.js and Ruby on Rails</p>
          <hr class="my-4"/>
          <p>Explore different apartments and create your own!</p>
          <p class="lead">
            <a class="btn btn-primary btn-lg" href="/apartments" role="button">Explore Apartments</a>
            <br/>
            <br/>
            <a class="btn btn-primary btn-lg" href="/apartments/new" role="button">Create Apartment</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
