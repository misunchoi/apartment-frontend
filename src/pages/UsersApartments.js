import React, { Component } from 'react';
import { getUserApartments } from '../api';
import AuthService from '../services'

const cardContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

const card = {
  minWidth: "20rem",
  margin: '20px'
}

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
    console.log(this.state.apartment)
    
    if (this.state.apartment.length === 0) {
      return (
        <div>
          <h3>My Apartments</h3>
        </div>
      )
    } else {
      return (
        <div>
          <h3>My Apartments</h3>
          <div style={cardContainer}>
            {
              this.state.apartment.map(el => {
                return (
                  <div style={card} key={el.id} className="card">
                    <div className="card-body">
                      <h4 className="card-title">Apartment No.{el.id}</h4>
                      <p className="card-text">
                        {el.street1} {el.street2} <br/>
                        {el.city}, {el.state} {el.postal_code} <br/><br/>
                        Manager: {el.building_manager} <br/>
                        Phone: {el.manager_phone} <br/>
                        Hours: {el.manager_hours}
                      </p>
                      <a href={`/apartments/${el.id}/edit`} className="btn btn-primary">Edit</a>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }


  }
 


}

export default UsersApartments;
