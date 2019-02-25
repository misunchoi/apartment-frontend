import React, { Component } from 'react';
import { getApartments } from '../api';
import "./Apartments.css";

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
              <div class="card border-primary mb-3" style={{maxWidth: "20rem", margin: '20px'}}>
                <div class="card-header">Now Available</div>
                <div class="card-body">
                  <h4 class="card-title">{`${el.street1}, ${el.city}, ${el.postal_code}`}</h4>
                  <p class="card-text">{el.building_manager}, phone: {el.manager_phone} <br/>
                    <a href={`/apartments/${el.id}`} >Details</a>
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
