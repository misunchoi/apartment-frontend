import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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


class Login extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      loginSuccess: false,
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
        <h4>Login</h4>
        <form onSubmit={this.onSubmit}>
          <div style={group} className="form-group" >
            <label style={label}>Email</label>
            <input style={input} className="form-control" onChange={this.onChange} name="email" value={email} type="email"/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Password</label>
            <input style={input} className="form-control" onChange={this.onChange} name="password" value={password} type="password"/>
          </div>

          <button style={{margin: '20px'}} type="submit" className="btn btn-primary">Login</button>
          <p>Don't have an account? Register <a href="/users/new">here</a></p>
        </form>
        {this.state.loginSuccess && <Redirect to="/"/>}
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
    this.auth.login(this.state.form)
    .then(json => {
      // console.log("got to second then:", json)
      if(json.errors) {
        // console.log("!! ERRORS !!", json.errors);
        this.setState({
          errors: json.errors
        })
      } else {
        this.setState({
          loginSuccess: true
        })
      }
    })
  }

}

export default Login;
