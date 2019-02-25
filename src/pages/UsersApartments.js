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
      deleteSuccess: false,
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
    console.log(this.state.apartment)
    return (
      this.state.apartment.map(el => {
        return (
            <ListGroup key={el.id} className="indexListing">
            <ListGroupItem className="list-group" header={`${el.street1} ${el.street2}, ${el.city}, ${el.postal_code}`} href={`/apartments/${el.id}`}> {el.building_manager}, phone: {el.manager_phone}
            <br />
            <a href={`/apartments/${el.id}/edit`} class="btn btn-primary destroyBotton">Edit Apartment</a>
            </ListGroupItem>
            </ListGroup>
        )
      })
    )
  }
 


}

export default UsersApartments;
