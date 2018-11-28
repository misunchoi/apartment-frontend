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
    return (
      <div>
        just one apartment
      </div>
    )
  }
}

// <div>
//   {this.state.apartment.street1}
// </div>
export default Apartment;
