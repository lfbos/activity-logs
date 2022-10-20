import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image, Button, Label } from "semantic-ui-react";
import swal from "sweetalert";
import { postLike } from "../../../apiUtils";

const emptyImageUrl = "https://react.semantic-ui.com/images/wireframe/image.png";

function Post(props) {
  const {
    postId,
    title,
    imageUrl,
    userLikes,
    likes
  } = props;
  const imageSrc = imageUrl === null ? emptyImageUrl : imageUrl;

  const [like, setLike] = useState(userLikes);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    postLike(postId)
      .then(() => {
        setLike(1);
        setCurrentLikes(currentLikes + 1);
      })
      .catch(() => {
        swal("Error!", "Unexpected error, try later...", "error");
      });
  }

  return (
    <Card>
      <Image src={imageSrc} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link to={`/${postId}`}>{title}</Link>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button as='div' labelPosition='right'>
            <Button 
              onClick={handleLike}
              icon 
              color={like > 0 ? "red" : ""} 
              disabled={like > 0}>
              <Icon name='heart' />
              Like
            </Button>
            <Label basic pointing='left'>
              {currentLikes}
            </Label>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
export default Post;