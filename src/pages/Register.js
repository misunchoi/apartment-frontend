import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { BrowserRouter as Redirect } from 'react-router-dom';
import AuthService from '../services'

class Register extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      registerSuccess: false,
      errors: "",
      form: {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        }
      }
    }
  }

  render () {
    let {
      firstName,
      lastName,
      email,
      password
    } = this.state.form.user
    return(
      <div>
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup controlId="formHorizontalFirstName">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={10}>
            <FormControl onChange={this.onChange} name="firstName" value={firstName} type="firstName" placeholder="First Name" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLastName">
          <Col componentClass={ControlLabel} sm={2}>
            Last Name
          </Col>
          <Col sm={10}>
            <FormControl onChange={this.onChange} name="lastName" value={lastName} type="lastName" placeholder="Last Name" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl onChange={this.onChange} name="email" value={email} type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl onChange={this.onChange} name="password" value={password} type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Register Me!</Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
    )
  }

  onChange = (e) => {
    let { form } = this.state
    form.user[e.target.name] = e.target.value
    this.setState ({
      form
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.auth.register(this.state.form)
    .then(json => {
      // console.log("got to second then:", json)
      if(json.errors) {
        // console.log("!! ERRORS !!", json.errors);
        this.setState({
          errors: json.errors
        })
      } else {
        this.props.refresh()
      }
    })
  }

}

export default Register;
