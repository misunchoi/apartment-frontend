import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AuthService from '../services'

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
      user_id,
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

    // if (this.state.successApt == true) {
    //   console.log("made to above redirect");
    //   return <Redirect exact to='/login' />
    // }

    return(
      <div>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="formHorizontalStreet1">
            <Col componentClass={ControlLabel} sm={2}>
              Street 1
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="street1" value={street1} type="street1" placeholder="Street 1" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalStreet2">
            <Col componentClass={ControlLabel} sm={2}>
              Street 2
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="street2" value={street2} type="street2" placeholder="Street 2" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalCity">
            <Col componentClass={ControlLabel} sm={2}>
              City
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="city" value={city} type="city" placeholder="City" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPostalCode">
            <Col componentClass={ControlLabel} sm={2}>
              Postal Code
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="postal_code" value={postal_code} type="number" placeholder="Postal Code" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalState">
            <Col componentClass={ControlLabel} sm={2}>
              State
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="state" value={state} type="state" placeholder="State" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalCountry">
            <Col componentClass={ControlLabel} sm={2}>
              Country
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="country" value={country} type="country" placeholder="Country" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalBuildingManager">
            <Col componentClass={ControlLabel} sm={2}>
              Building Manager
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="building_manager" value={building_manager} type="building_manager" placeholder="Building Manager" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalManagerPhone">
            <Col componentClass={ControlLabel} sm={2}>
              Manager Phone
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="manager_phone" value={manager_phone} type="manager_phone" placeholder="Manager Phone" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalManagerHours">
            <Col componentClass={ControlLabel} sm={2}>
              Manager Hours
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="manager_hours" value={manager_hours} type="manager_hours" placeholder="Manager Hours" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Create Apartment</Button>
            </Col>
          </FormGroup>
        </Form>
      {this.state.successApt && <Redirect to="/apartments" />}
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
    this.auth.createApt(this.state.form)
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
