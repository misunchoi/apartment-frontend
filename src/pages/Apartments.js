import React, { Component } from 'react';
import { getApartments } from '../api';

const cards = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center'
}


class Apartments extends Component {
  constructor(props){
    super(props)
    this.state = {
        apartments:[]
    }
  }

  componentWillMount() {
    getApartments()
    .then(APIapartments => {
      this.setState({
          apartments: APIapartments
      })
    })
  }

  render() {
    console.log(this.state.apartments);
    return (
      <div style={cards}>
        {this.state.apartments.map(el => {
          return (
            <div key={el.id} class="card border-primary mb-3" style={{minWidth: "20rem", margin: '20px'}}>
              <div class="card-header">Apartment No.{el.id}</div>
              <div class="card-body">
                <h4 class="card-title">
                  {el.city}, {el.state}
                </h4>
                <p class="card-text">
                  Manager: {el.building_manager} <br/>
                  Phone: {el.manager_phone} <br/><br/>
                  <a className="btn btn-primary" href={`/apartments/${el.id}`}>Details</a>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Apartments;
