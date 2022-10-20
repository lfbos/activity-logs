import axios from "axios";
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment, Icon } from "semantic-ui-react";
import { urls } from "../../apiUtils";

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    repeatedPassword: '',
    error: '',
    loginRedirect: false,
    shouldRedirect: localStorage.getItem("__ACCESS_TOKEN") !== null
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    const {
      firstName,
      lastName,
      username,
      password,
      repeatedPassword
    } = this.state;

    if (firstName.trim().length === 0) {
      this.setState({ error: "First name cannot be empty!" });
      return
    }

    if (lastName.trim().length === 0) {
      this.setState({ error: "Last name cannot be empty!" });
      return
    }

    if (username.trim().length === 0) {
      this.setState({ error: "Username cannot be empty!" });
      return
    }

    if (password.trim().length === 0) {
      this.setState({ error: "Password cannot be empty!" });
      return
    }

    if (repeatedPassword.trim().length === 0) {
      this.setState({ error: "The password repeated cannot be empty!" });
      return
    }

    if (password !== repeatedPassword) {
      this.setState({ error: "Passwords do not match!" });
      return
    }

    this.setState({ loading: true });
    axios.post(
      urls.register, 
      { 
        first_name: firstName,
        last_name: firstName,
        username, 
        password,
        repeated_password: repeatedPassword 
      }
    ).then(() => {
        this.setState({ loginRedirect: true });
      })
      .catch((error) => {
        this.setState({ error: "Unexpected error, try later..." });
        console.log(error);
      })
      .finally(() => this.setState({ loading: false }));
  }
  render() {
    const {
      firstName,
      lastName,
      username,
      password,
      repeatedPassword,
      error,
      shouldRedirect,
      loginRedirect
    } = this.state;
    return (
      <>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Create to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  placeholder='First Name'
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange} />
                <Form.Input
                  required
                  fluid
                  placeholder='Last Name'
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange} />
                <Form.Input
                  required
                  fluid
                  placeholder='Username'
                  name="username"
                  value={username}
                  onChange={this.handleChange} />
                <Form.Input
                  fluid
                  required
                  name="password"
                  value={password}
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange} />
                <Form.Input
                  fluid
                  required
                  name="repeatedPassword"
                  value={repeatedPassword}
                  placeholder='Repeat password'
                  type='password'
                  onChange={this.handleChange} />

                <Button color='teal' fluid size='large'>
                  Register
                </Button>
              </Segment>
            </Form>
            {error && (
              <Message error>
                <Icon name='x' />
                {error}
              </Message>
            )}
            <Message>
              Already registered? <Link to="/login">Log-in</Link>
            </Message>
          </Grid.Column>
        </Grid>
        {shouldRedirect && <Navigate replace to="/" />}
        {loginRedirect && <Navigate replace to="/login" />}
      </>
    );
  }
}

export default SignUp;