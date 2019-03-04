import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services'
import { createApartment } from '../api';


const group = {
  display: "flex",
  flexDirection: 'column',
  margin: 'auto'
}

const input = {
  width: "300px",
  marginBottom: "10px"
}

const label = {
  textAlign: 'left'
}


class CreateApartment extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    let user = this.auth.getUserId()
    this.state = {
      successApt: false,
      form: {
        apartment: {
          user_id: user,
          street1: "",
          street2: "",
          city: "",
          postal_code: "",
          state: "",
          country: "",
          building_manager: "",
          manager_phone: "",
          manager_hours: ""
        }
      }
    }
  }

  render () {
    let {
      street1,
      street2,
      city,
      postal_code,
      state,
      country,
      building_manager,
      manager_phone,
      manager_hours
    } = this.state.form.apartment

    return(
      <div>
        <h3>Create Apartment</h3><br/>
        <form onSubmit={this.onSubmit}>
          <fieldset>

          <div style={group} className="form-group" >
            <label style={label}>Street 1</label>
            <input style={input} className="form-control" onChange={this.onChange} name="street1" value={street1} type="street1" placeholder="Please Enter Street Address" />
          </div>

          <div style={group} className="form-group">
            <label style={label}>Street 2</label>
            <input style={input} className="form-control" onChange={this.onChange} name="street2" value={street2} type="street2" placeholder="Apt, Unit, etc." />
          </div>

          <div style={group} className="form-group">
            <label style={label}>City</label>
            <input style={input} className="form-control" onChange={this.onChange} name="city" value={city} type="city" placeholder="City" />
          </div>

          <div style={group} className="form-group">
            <label style={label}>Zip Code</label>
            <input style={input} className="form-control" onChange={this.onChange} name="postal_code" value={postal_code} type="number" placeholder="Zip Code" />
          </div>

          <div style={group} className="form-group">
            <label style={label}>State</label>
            <input style={input} className="form-control" onChange={this.onChange} name="state" value={state} type="state" placeholder="State" />
          </div>

          <div style={group} className="form-group">
            <label style={label}>Country</label>
            <input style={input} className="form-control" onChange={this.onChange} name="country" value={country} type="country" placeholder="Country" />
          </div>

          <div style={group} className="form-group">
            <label style={label}>Building Manager</label>
            <input style={input} className="form-control" onChange={this.onChange} name="building_manager" value={building_manager} type="building_manager" placeholder="Please Enter Full Name" />
          </div>

          <div style={group} className="form-group">
            <label style={label}>Manager Phone</label>
            <input style={input} className="form-control" onChange={this.onChange} name="manager_phone" value={manager_phone} type="manager_phone" placeholder="###-###-####" />
          </div>

          <div style={group} className="form-group">
            <label style={label}>Manager Hours</label>
            <input style={input} className="form-control" onChange={this.onChange} name="manager_hours" value={manager_hours} type="manager_hours" placeholder="example: 2 PM - 7 PM" />
          </div>

          
          <button style={{margin: '20px'}} type="submit" className="btn btn-primary">Create</button>
          </fieldset>
        </form>

      {this.state.successApt && <Redirect to={`/users/${this.state.form.apartment.user_id}/apartments`} />}
      </div>
    )
  }

  onChange = (e) => {
    let { form } = this.state
    form.apartment[e.target.name] = e.target.value
    this.setState ({
      form
    })
    console.log(this.state.form);
  }

  onSubmit = (e) => {
    e.preventDefault()
    createApartment(this.state.form)
    .then(json => {
      console.log("got to second then:", json)
      if(json.errors) {
        console.log("!! ERRORS !!", json.errors);
        this.setState({
          errors: json.errors
        })
      } else {
        console.log("i am else");
        this.setState ({
          successApt: true
        })
      }
    })
  }

}

export default CreateApartment;
