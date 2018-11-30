import React, { Component } from 'react';
import { getUserApartments } from '../api';
import "./Apartments.css";
import AuthService from '../services'


import { ListGroup, ListGroupItem } from 'react-bootstrap';

class UsersApartments extends Component {
  constructor(props) {
    super(props)
    this.auth = new AuthService()
    this.state = {
      apartment: []
    }
  }

  componentDidMount(){
    const id = this.auth.getUserId()
    console.log(id)
    getUserApartments(id)
    .then((apartment) => {
      console.log(`componentdidmount ${apartment}`);
      this.setState({apartment})
    })
  }

  render() {
    console.log(this.state.apartment);
    return (
      this.state.apartment.map(el => {
        if (el.street2 == null) {
          return (
            <ListGroup className="indexListing">
            <ListGroupItem className="list-group" header={`${el.street1}, ${el.city}, ${el.postal_code}`} href={`/apartments/${el.id}`}> {el.building_manager}, phone: {el.manager_phone}
            </ListGroupItem>
            </ListGroup>
          )
        } else {
          return (
            <ListGroup className="indexListing">
            <ListGroupItem className="list-group" header={`${el.street1} ${el.street2}, ${el.city}, ${el.postal_code}`} href={`/apartments/${el.id}`}> {el.building_manager}, phone: {el.manager_phone}
            </ListGroupItem>
            </ListGroup>
          )
        }




      })
    );
  }

}

export default UsersApartments;
