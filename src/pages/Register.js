import React, { Component } from "react";
import AuthService from "../services";
import { formStyles } from "./Login";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = {
      registerSuccess: false,
      passwordValidation: "form-control",
      emailValidation: "form-control",
      errorMessage: "",
      messageColor: "",
      errors: "",
      form: {
        user: {
          email: "",
          password: ""
        }
      }
    };
  }

  onChange = e => {
    let { form } = this.state;
    form.user[e.target.name] = e.target.value;
    this.setState({
      form
    });
    this.handleValidation(e);
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.form.user.email === "" ||
      this.state.form.user.password === ""
    ) {
      this.setState({
        errorMessage: "Email and/or password cannot be blank.",
        messageColor: "red"
      });
    } else {
      this.setState({
        errorMessage: "Please wait...",
        messageColor: "blue"
      });

      this.auth.register(this.state.form).then(json => {
        if (
          this.state.emailValidation === "form-control is-invalid" ||
          this.state.passwordValidation === "form-control is-invalid"
        ) {
          this.setState({
            errors: json.errors,
            errorMessage: "Please enter a valid email or password.",
            messageColor: "red"
          });
        } else if (json.errors === undefined) {
          this.props.refresh();
        } else if (json.errors.email) {
          this.setState({
            errors: json.errors,
            errorMessage: "The email is already registered.",
            messageColor: "red"
          });
        } else {
          this.props.refresh();
        }
      });
    }
  };

  handleValidation = e => {
    e.preventDefault();
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        this.state.form.user.email
      ) &&
      this.state.form.user.password.length < 6
    ) {
      this.setState({
        emailValidation: "form-control is-invalid",
        passwordValidation: "form-control is-invalid"
      });
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        this.state.form.user.email
      )
    ) {
      this.setState({
        emailValidation: "form-control is-invalid",
        passwordValidation: "form-control"
      });
    } else if (this.state.form.user.password.length < 6) {
      this.setState({
        emailValidation: "form-control",
        passwordValidation: "form-control is-invalid"
      });
    } else {
      this.setState({
        emailValidation: "form-control",
        passwordValidation: "form-control"
      });
    }
  };

  render() {
    let { email, password } = this.state.form.user;
    const { formWrapper, form, group, label, input } = formStyles;

    return (
      <div style={formWrapper}>
        <h4>Create Account</h4>
        <form style={form} onSubmit={this.onSubmit}>
          <div style={group} class="form-group">
            <label style={label}>Email</label>
            <input
              style={input}
              className={this.state.emailValidation}
              onChange={this.onChange}
              name="email"
              value={email}
              type="email"
            />
            <div class="invalid-feedback">
              Please enter a valid email address
            </div>
          </div>

          <div style={group} class="form-group">
            <label style={label}>Password</label>
            <input
              style={input}
              className={this.state.passwordValidation}
              onChange={this.onChange}
              name="password"
              value={password}
              type="password"
            />
            <div class="invalid-feedback">
              Password needs to be at least 6 characters long
            </div>
          </div>
          {this.state.errorMessage && (
            <p style={{ color: this.state.messageColor }}>
              {this.state.errorMessage}
            </p>
          )}

          <button
            style={{ margin: "20px" }}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
          <p>
            Already registered? Login <Link to="/login">here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Register;
