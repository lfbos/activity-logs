import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Dimmer, Grid, Header, Icon, List, Loader, Menu, Segment } from "semantic-ui-react";
import swal from "sweetalert";

import { getStats } from "../../apiUtils";

class Stats extends Component {
    state = { loading: true, stats: null, redirect: false }

    componentDidMount() {
        getStats()
            .then(({ data }) => {
                this.setState({ stats: data });
            })
            .catch(() => swal("Error!", "Unexpected error, try later...", "error"))
            .finally(() => this.setState({ loading: false }));
    }

    logout = () => {
        localStorage.clear();
        this.setState({ redirect: true });
    }

    renderTopViewedPosts() {
        const {stats} = this.state;

        if (!stats) {
            return null;
        }

        const topMostViewed = stats.top_most_viewed;
        if (topMostViewed.length === 0) {
            return (
                <List.Content key={0}>
                    <List.Header>Not posts found</List.Header>
                </List.Content>
            );
        }
        
        let postComponents = [];
        for (let post of topMostViewed) {
            postComponents.push(
                <List.Item key={post.id}>
                    <List.Icon name='circle outline' size='small' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>
                        <Link to={`/${post.id}`}>{post.title}</Link>
                        </List.Header>
                        <List.Description>Views {post.total}</List.Description>
                    </List.Content>
                </List.Item>
            );
        }

        return postComponents;
    }

    renderTopLikedPosts() {
        const {stats} = this.state;
        
        if (!stats) {
            return null;
        }
        const topMostLiked = stats.top_most_liked;

        if (topMostLiked.length === 0) {
            return (
                <List.Content key={0}>
                    <List.Header>Not posts found</List.Header>
                </List.Content>
            );
        }

        let postComponents = [];
        for (let post of topMostLiked) {
            postComponents.push(
                <List.Item key={post.id}>
                <List.Icon name='circle outline' size='small' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>
                            <Link to={`/${post.id}`}>{post.title}</Link>
                        </List.Header>
                        <List.Description>Likes {post.total}</List.Description>
                    </List.Content>
                </List.Item>
            );
        }

        return postComponents;
    }

    render() {
        const { loading, stats, redirect } = this.state;

        return (
            <>
                <div>
                    <Menu fixed='top' inverted>
                        <Container>
                            <Menu.Item header>
                                Activity Logs
                            </Menu.Item>
                            <Menu.Item header>
                                <Link to="/">Posts</Link>
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                <Menu.Item
                                    name='logout'
                                    onClick={this.logout}
                                />
                                <Menu.Item
                                    name={localStorage.getItem("__USERNAME")}
                                />
                            </Menu.Menu>
                        </Container>
                    </Menu>
                    <Container style={{ marginTop: '7em' }}>
                        <Dimmer active={loading}>
                            <Loader />
                        </Dimmer>

                        {!stats && (
                            <Segment>
                                <Header as='h1' textAlign='center'>There are not any posts yet to show data</Header>
                            </Segment>
                        )}
                        {stats && (
                            <>
                                <Segment>
                                    <Header as='h2' textAlign='left'>
                                        <Icon name="user" /> Total users registered {stats.user_registered}
                                    </Header>
                                </Segment>
                                <Segment>
                                    <Grid columns={2} divided>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header as='h3' textAlign='left'>
                                                    Top 5 Most Viewed Posts
                                                </Header>
                                                <List divided relaxed>
                                                    {this.renderTopViewedPosts()}
                                                </List>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header as='h3' textAlign='left'>
                                                    Top 5 Most Liked Posts
                                                </Header>
                                                <List divided relaxed>
                                                    {this.renderTopLikedPosts()}
                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </>
                        )}
                    </Container>
                </div>
                {redirect && <Navigate replace to="/login" />}
            </>
        );
    }
}

export default Stats;