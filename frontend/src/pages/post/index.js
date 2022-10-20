import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import swal from "sweetalert";
import {
    Container,
    Header,
    Segment,
    Image,
    Menu,
    Dimmer,
    Loader
} from "semantic-ui-react";
import { getPost, registerView } from "../../apiUtils";

const emptyImageUrl = "https://react.semantic-ui.com/images/wireframe/image.png";

function PostPage() {
    let { postId } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const logout = () => {
        localStorage.clear();
        setRedirect(false);
    }

    useEffect(() => {
        setLoading(true);
        getPost(postId)
            .then((response) => {
                setPost(response.data);
                // Register new view
                registerView(postId).then(() => {
                    console.log("View registered!");
                });
            })
            .catch(() => swal("Error getting post", "Unexpected error getting post data, try later...", "error"))
            .finally(() => setLoading(false));
    }, []);

    const imageSrc = post !== null && post.image_src !== null ? post.image_src : emptyImageUrl;

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
                        <Menu.Item header>
                            <Link to="/dashboard">Stats</Link>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='logout'
                                onClick={logout}
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
                    {post !== null && <Header as='h2'>{post.title}</Header>}
                    {post !== null && (<Segment>
                        <Header as='h1'>
                        {post.title}
                        </Header>
                        <Header.Subheader as='h4'>
                            {post.likes} Likes
                        </Header.Subheader>
                        <hr/>
                        <Image 
                            src={imageSrc} 
                            size='medium' centered />
                        <hr/>
                        <p>{post.description}</p>
                    </Segment>)}
                </Container>
            </div>
            {redirect && <Navigate replace to="/login" />}
        </>
    );
}

export default PostPage;