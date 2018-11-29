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
      if (this.state.apartment != undefined) {
        return (
          <div>
            {apartment.street1}
            <br/>
            {apartment.street2}
            <br/>
            {apartment.city}, {apartment.state}, {apartment.postal_code}
            <br/>
            <br/>
            {apartment.building_manager}: {apartment.manager_phone}, office hours: {apartment.manager_hours}
            <br/>
            <br/>
            <br/>
          </div>
        )
      } else {
        return (
          <div>
            page loading
          </div>
        )
      }
    }
}

// <div>
//   {this.state.apartment.street1}
// </div>
export default Apartment;
