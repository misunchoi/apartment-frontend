import React, { Component } from 'react';
import { getUserApartments, destroyApartment } from '../api';
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
            <a onClick={() => this.destroyApt(el.id)} href="" class="btn btn-primary destroyButton">Delete Apartment</a>
            <a href={`/apartments/${el.id}/edit`} class="btn btn-primary destroyBotton">Edit Apartment</a>
            </ListGroupItem>
            </ListGroup>
        )
      })
    )
  }
 
destroyApt = (id) => {
  console.log(id);
  destroyApartment(id)
  .then(resp => {
    console.log("Deleted");
    this.setState({deleteSuccess: true})
    this.props.refresh()
  })
}


}

export default UsersApartments;
