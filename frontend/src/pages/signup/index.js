import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";

function SignUp() {
    return (
      <>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid placeholder='First Name' />
              <Form.Input fluid placeholder='Last Name' />
              <Form.Input fluid placeholder='E-mail address' />
              <Form.Input
                fluid
                placeholder='Password'
                type='password'
              />
              <Form.Input
                fluid
                placeholder='Repeat password'
                type='password'
              />

              <Button color='teal' fluid size='large'>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already registered? <Link to="/login">Log-in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
    );
  }

  export default SignUp;