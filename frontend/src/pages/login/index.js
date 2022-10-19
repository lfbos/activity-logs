import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment, Icon } from "semantic-ui-react";
import { axiosInstance, urls } from "../../apiUtils";

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    loading: false,
    shouldRedirect: localStorage.getItem("__ACCESS_TOKEN") !== null
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    const { username, password } = this.state;

    if (username.trim().length === 0) {
      this.setState({ error: "Username cannot be empty!" });
      return
    }

    if (password.trim().length === 0) {
      this.setState({ error: "Password cannot be empty!" });
      return
    }

    this.setState({ loading: true });
    axiosInstance.post(urls.login, { username, password })
      .then(({ data }) => {
        localStorage.setItem("__ACCESS_TOKEN", data.access);
        localStorage.setItem("__REFRESH_TOKEN", data.refresh);
        this.setState({ shouldRedirect: true });
      })
      .catch((error) => {
        this.setState({ error: "Unexpected error, try later..." });
        console.log(error.response.message);
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { username, password, error, loading, shouldRedirect } = this.state;

    return (
      <>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} loading={loading}>
              <Segment stacked>
                <Form.Input
                  fluid
                  required
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name="username"
                  value={username}
                  onChange={this.handleChange} />
                <Form.Input
                  fluid
                  required
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  type='password'
                />

                <Button color='teal' fluid size='large'>
                  Login
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
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
        {shouldRedirect && <Navigate replace to="/" />}
      </>
    );
  }
}

export default Login;