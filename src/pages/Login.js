import React, { Component } from "react";
import AuthService from "../services";
import { Link } from "react-router-dom";

export const formStyles = {
  formWrapper: {
    marginTop: "30px",
    backgroundColor: "rgba(255, 255, 255,0.65)",
    padding: "1em",
    width: "350px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center'
  },
  group: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  input: {
    width: "300px"
  },
  label: {
    textAlign: "left",
    marginTop: "10px"
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = {
      loginSuccess: false,
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
      },
      submitted: false,
      invalidInput: false,
    };
  }

  onChange = e => {
    let { form } = this.state;
    form.user[e.target.name] = e.target.value;
    this.setState({
      form
    });
    this.state.submitted && this.handleValidation(e);
  };

  onSubmit = e => {
    e.preventDefault();
    this.handleValidation(e);

    this.setState({
      errorMessage: "Please wait...",
      messageColor: "blue",
      submitted: true,
    });
      this.auth.login(this.state.form).then(json => {
        if (json.error) {
          this.setState({
            errors: json.error,
            errorMessage: "You have entered an invalid username or password.",
            messageColor: "red"
          });
        } else {
          this.props.refresh();
        }
      });
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
        invalidInput: true,
        emailValidation: "form-control is-invalid",
        passwordValidation: "form-control is-invalid"
      });
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        this.state.form.user.email
      )
    ) {
      this.setState({
        invalidInput: true,
        emailValidation: "form-control is-invalid",
        passwordValidation: "form-control"
      });
    } else if (this.state.form.user.password.length < 6) {
      this.setState({
        invalidInput: true,
        emailValidation: "form-control",
        passwordValidation: "form-control is-invalid"
      });
    } else {
      this.setState({
        invalidInput: false,
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
        <h4>Login</h4>
        {this.state.errorMessage && (
            <p style={{ color: this.state.messageColor }}>
              {this.state.errorMessage}
            </p>
          )}
        <form style={form} onSubmit={this.onSubmit}>
          <div style={group} class="form-group">
            <label style={label}>Email</label>
            <input
              style={input}
              className={this.state.emailValidation}
              onChange={this.onChange}
              name="email"
              value={email}
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

          <button
            style={{ margin: "20px" }}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>

          <p>
            Don't have an account? Register <Link to="/users/new">here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
