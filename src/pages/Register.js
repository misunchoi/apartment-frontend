import React, { Component } from 'react';
import AuthService from '../services'

const form = {
  marginTop: "30px"
}

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

class Register extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      registerSuccess: false,
      errors: "",
      form: {
        user: {
          email: "",
          password: ""
        }
      }
    }
  }

  render () {
    let {
      email,
      password
    } = this.state.form.user
    return(

      <div style={form}>
        <h4>New Account</h4>
        <form onSubmit={this.onSubmit}>
          <div style={group} className="form-group" >
            <label style={label}>Email</label>
            <input style={input} className="form-control" onChange={this.onChange} name="email" value={email} type="email"/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Password</label>
            <input style={input} className="form-control" onChange={this.onChange} name="password" value={password} type="password"/>
          </div>

          <button style={{marginTop: '20px'}} type="submit" className="btn btn-primary">Register</button>
        </form>
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
