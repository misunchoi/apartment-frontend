import React, { Component } from 'react';
import { getApartment } from '../api'
import { ListGroup, ListGroupItem } from 'react-bootstrap';


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
          <ListGroup className="indexListing">
          <ListGroupItem className="list-group" header={`${apartment.street1} ${apartment.street2}, ${apartment.city}, ${apartment.postal_code}`} > {apartment.building_manager}, phone: {apartment.manager_phone}, {apartment.manager_hours}
          </ListGroupItem>
          </ListGroup>
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
