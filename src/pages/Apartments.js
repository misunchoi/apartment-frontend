import React, { Component } from 'react';
import { getApartments } from '../api'

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
      this.state.apartments.map(el => {
        return (
          <div>
          {el.street1}
          <br/>
          {el.street2}
          <br/>
          {el.city}, {el.state}, {el.postal_code}
          <br/>
          <br/>
          {el.building_manager}
          {el.manager_phone}
          {el.manager_hours}
          <br/>
          <br/>
          <br/>

          </div>
        )
      })
    );
  }
}

export default Apartments;
