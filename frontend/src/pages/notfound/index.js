import { Grid, Header } from "semantic-ui-react";

function PageNotFound() {
    return <>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h1' color='red' textAlign='center'>
             PAGE NOT FOUND
            </Header>
        </Grid.Column>    
    </Grid>
  </>
}

export default PageNotFound;