import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { editApartment, getApartment } from '../api';


class EditApartment extends Component {
  constructor(props){
    super(props)
    // let user = this.auth.getUserId()
    this.state = {
      editSuccess: false,
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
      manager_hours,
      user_id
    } = this.state

    console.log(this.state);

  if (this.state.apartment != undefined) {
    return(
      <div>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="formHorizontalStreet1">
            <Col componentClass={ControlLabel} sm={2}>
              Street 1
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="street1" value={street1} type="street1" placeholder={this.state.apartment.street1}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalStreet2">
            <Col componentClass={ControlLabel} sm={2}>
              Street 2
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="street2" value={street2} type="street2" placeholder={this.state.apartment.street2} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalCity">
            <Col componentClass={ControlLabel} sm={2}>
              City
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="city" value={city} type="city" placeholder={this.state.apartment.city} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPostalCode">
            <Col componentClass={ControlLabel} sm={2}>
              Postal Code
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="postal_code" value={postal_code} type="number" placeholder={this.state.apartment.postal_code} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalState">
            <Col componentClass={ControlLabel} sm={2}>
              State
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="state" value={state} type="state" placeholder={this.state.apartment.state} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalCountry">
            <Col componentClass={ControlLabel} sm={2}>
              Country
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="country" value={country} type="country" placeholder={this.state.apartment.country}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalBuildingManager">
            <Col componentClass={ControlLabel} sm={2}>
              Building Manager
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="building_manager" value={building_manager} type="building_manager" placeholder={this.state.apartment.building_manager}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalManagerPhone">
            <Col componentClass={ControlLabel} sm={2}>
              Manager Phone
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="manager_phone" value={manager_phone} type="manager_phone" placeholder={this.state.apartment.manager_phone}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalManagerHours">
            <Col componentClass={ControlLabel} sm={2}>
              Manager Hours
            </Col>
            <Col sm={10}>
              <FormControl onChange={this.onChange} name="manager_hours" value={manager_hours} type="manager_hours" placeholder={this.state.apartment.manager_hours}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Edit Apartment</Button>
            </Col>
          </FormGroup>
        </Form>
      // {this.state.editSuccess && <Redirect to={`/users/${this.state.apartment.user_id}/apartments`}/>}
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

  onChange = (e) => {
    let { apartment } = this.state
    apartment[e.target.name] = e.target.value
    this.setState ({
      apartment
    })
    console.log(this.state.apartment);
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log("got to onSubmit");
    editApartment(this.state.apartment)
    .then(resp => {
      console.log("Edited");
      this.setState({editSuccess: true})
    })
  }

}

export default EditApartment;
