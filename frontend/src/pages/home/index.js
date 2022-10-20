import { Component } from "react";
import { Link, Navigate, } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import swal from "sweetalert";
import { fetchPosts } from "../../apiUtils";
import {
  Container,
  Header,
  Menu,
  Loader,
  Segment,
  Dimmer,
  Card
} from "semantic-ui-react";
import Post from "./components/post";

class Home extends Component {
  state = { 
    redirect: false, 
    loading: true, 
    results: [],
    next: null
  }
  logout = () => {
    localStorage.clear();
    this.setState({ redirect: true });
  }

  componentDidMount() {
    fetchPosts()
      .then((response) => {
        this.setState(response.data);
      })
      .catch(() => {
        swal("Error getting posts", "Unexpected error getting posts, try later...", "error");
      })
      .finally(() => this.setState({loading: false}));
  }

  loadMoreData = () => {
    const {results, next} = this.state;
    if (next === null) {
      return
    }

    fetchPosts(next)
      .then((response) => {
        this.setState({
          results: results.concat(response.data.results),
          next: response.data.next,
        });
      })
      .catch(() => {
        swal("Error getting posts", "Unexpected error getting more posts, try later...", "error");
      })
      .finally(() => this.setState({loading: false}));
  }

  renderPosts() {
    const {results} = this.state;
    if (results.length === 0) {
      return null;
    }

    let postComponents = [];
    for (let post of results) {
      postComponents.push(
        <Post 
          key={post.id}
          id={post.id}
          postId={post.id}
          title={post.title} 
          imageUrl={post.image_src}
          userLikes={post.current_user_likes}
          likes={post.likes} />
      );
    }

    return postComponents;
  }

  render() {
    const {redirect, loading, results, next} = this.state;

    return (
      <>
        <div>
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item header>
                Activity Logs
              </Menu.Item>
              <Menu.Item as='a' header>
                <Link to="/dashboard">Stats</Link>
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

            {results.length === 0 && (
              <Segment>
                <Header as='h1' textAlign='center'>There are not any posts yet</Header>
              </Segment>
            )}
            {results.length > 0 && (              
              <InfiniteScroll 
                loadMore={this.loadMoreData}
                hasMore={next !== null}>
                <Card.Group centered itemsPerRow={4}>
                  {this.renderPosts()}
                </Card.Group>
                <div style={{ marginTop: '3em', paddingBottom: '3em' }}>
                  <Loader active={next !== null} inline='centered' size='medium'>Loading more posts...</Loader>
                </div>
              </InfiniteScroll>
            )}
          </Container>
        </div>
        {redirect && <Navigate replace to="/login" />}
      </>
    );
  }
}

export default Home;