import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment, Icon } from "semantic-ui-react";

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    repeatedPassword: '',
    error: '',
    shouldRedirect: localStorage.getItem("__ACCESS_TOKEN") !== null
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  render() {
    const {
      firstName,
      lastName,
      username,
      password,
      repeatedPassword,
      error,
      shouldRedirect
    } = this.state;
    return (
      <>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Create to your account
            </Header>
            <Form size='large'>
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
                />
                <Form.Input
                  fluid
                  required
                  name="repeatedPassword"
                  value={repeatedPassword}
                  placeholder='Repeat password'
                  type='password'
                />

                <Button color='teal' fluid size='large'>
                  Register
                </Button>
              </Segment>
            </Form>
            (error && {
              <Message error>
                <Icon name='x' />
                {error}
              </Message>
            })
            <Message>
              Already registered? <Link to="/login">Log-in</Link>
            </Message>
          </Grid.Column>
        </Grid>
        {shouldRedirect && <Navigate replace to="/" />}
      </>
    );
  }
}

export default SignUp;