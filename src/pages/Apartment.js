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
    let { apartment } = this.state
    
      if (this.state.apartment !== undefined) {
        return (
            <div class="card border-primary mb-3" style={{minWidth: "20rem", margin: '20px'}}>
              <div class="card-header">Apartment No.{apartment.id}</div>
              <div class="card-body">
                <h4 class="card-title">
                  {apartment.street1} {apartment.street2} <br/>
                  {apartment.city}, {apartment.state} {apartment.postal_code}
                </h4>
                <p class="card-text">
                  Manager: {apartment.building_manager} <br/>
                  Phone: {apartment.manager_phone} <br/>
                  Hours: {apartment.manager_hours}
                </p>
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
