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
}

const label = {
  textAlign: 'left',
  marginTop: "10px"
}


class Login extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      loginSuccess: false,
      passwordValidation: "form-control",
      emailValidation: "form-control",
      errors: "",
      form: {
        user: {
          email: "",
          password: ""
        }
      }
    }
  }

  handleValidation = (e) => {
    e.preventDefault()
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.form.user.email) && this.state.form.user.password.length < 6) {
      this.setState({
        emailValidation: "form-control is-invalid",
        passwordValidation: "form-control is-invalid"
      })
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.form.user.email)) {
      this.setState({
        emailValidation: "form-control is-invalid",
        passwordValidation: "form-control",
      })
    } else if (this.state.form.user.password.length < 6) {
      this.setState({
        emailValidation: "form-control",
        passwordValidation: "form-control is-invalid",
      })
    } else {
      this.setState({
        emailValidation: "form-control",
        passwordValidation: "form-control",
      })
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
          {/* <div style={group} className="form-group" >
            <label style={label}>Email</label>
            <input style={input} className={this.state.emailValidation} onChange={this.onChange} name="email" value={email} type="email"/>
          </div> */}

          <div style={group} class="form-group">
            <label style={label}>Email</label>
            <input style={input} className={this.state.emailValidation} onChange={this.onChange} name="email" value={email} type="email"/>
            <div class="invalid-feedback">Please enter a valid email address</div>
          </div>

          <div style={group} class="form-group">
            <label style={label}>Password</label>
            <input style={input} className={this.state.passwordValidation} onChange={this.onChange} name="password" value={password} type="password"/>
            <div class="invalid-feedback">Password needs to be at least 6 characters long</div>
          </div>

          {/* <div style={group} className="form-group" >
            <label style={label}>Password</label>
            <input style={input} className="form-control" onChange={this.onChange} name="password" value={password} type="password"/>
          </div> */}

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

    this.handleValidation(e)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.handleValidation(e)
    this.auth.login(this.state.form)
    .then(json => {
      console.log("got to second then:", json)
      if(json.errors) {
        console.log("!! ERRORS !!", json.errors);
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
