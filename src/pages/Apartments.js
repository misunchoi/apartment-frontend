import React, { Component } from 'react';
import { getApartments } from '../api';
import "./Apartments.css";

import { ListGroup, ListGroupItem } from 'react-bootstrap';

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
          <ListGroup className="indexListing">
            <ListGroupItem className="list-group" header={`${el.street1}, ${el.street2}, ${el.city}, ${el.postal_code}`} href={`/apartments/${el.id}`}> {el.building_manager}, phone: {el.manager_phone}
            </ListGroupItem>
          </ListGroup>
        )
      })
    );
  }
}

export default Apartments;
