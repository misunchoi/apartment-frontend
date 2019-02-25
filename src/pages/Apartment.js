import React, { Component } from 'react';
import { getApartment } from '../api'


class Apartment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apartment: undefined
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id
    console.log(id)
    getApartment(id)
    .then((apartment) => {
      console.log(`componentdidmount ${apartment}`);
      this.setState({apartment})
    })
  }

  render() {
    console.log(this.state.apartment)
    let { apartment } = this.state
      if (this.state.apartment !== undefined) {
        return (
          <div class="card border-primary mb-3" style={{maxWidth: "20rem"}}>
            <div class="card-header">Now Available</div>
            <div class="card-body">
              <h4 class="card-title">{`${apartment.street1} ${apartment.street2}, ${apartment.city}, ${apartment.postal_code}`}</h4>
              <p class="card-text">{apartment.building_manager}, phone: {apartment.manager_phone}, {apartment.manager_hours}</p>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            Loading...
          </div>
        )
      }
    }
}

export default Apartment;
