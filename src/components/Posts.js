import react from "react";
import { Card, Grid, Button, Icon } from "semantic-ui-react";
import AddPost from "./AddPost";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/main.css";

class Posts extends react.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8080/posts/allPosts").then((response) =>
      this.setState({
        posts: response.data,
      })
    );
  }

  handlePostDelete(id) {
    axios
      .delete(`http://localhost:8080/posts/delete/${id}`)
      .then((response) => {
        let filteredPosts = this.state.posts.filter(
          (post) => post.postId !== id
        );
        this.setState({
          posts: filteredPosts,
        });
      });
  }

  renderPosts = (username, title, description, id) => {
    return (
      <Card
        className="my-card"
        style={{ wordWrap: "break-word" }}
        key={uuidv4()}
      >
        <Card.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={14}>
                <Card.Header className="header-font">{title}</Card.Header>
              </Grid.Column>
              <Grid.Column floated="right" verticalAlign="top" width={2}>
                <Button
                  onClick={() => this.handlePostDelete(id)}
                  className="delete-button"
                >
                  <Icon
                    style={{ paddingLeft: "20px" }}
                    name="delete"
                    color="red"
                  />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row verticalAlign="top">
              <Grid.Column width={12}>
                <Card.Description className="comment-font">
                  {description}
                </Card.Description>
              </Grid.Column>
              <Grid.Column width={3}>
                <Card.Meta>{username}</Card.Meta>
              </Grid.Column>
            </Grid.Row>
            <Card.Content extra>
              <Button
                basic
                className="post-details-button"
                color="green"
                onClick={() => this.props.history.push(`/postDetails/${id}`)}
              >
                See this post
              </Button>
            </Card.Content>
          </Grid>
        </Card.Content>
      </Card>
    );
  };

  savePost = (username, title, description, id) => {
    this.setState({
      posts: [
        ...this.state.posts,
        {
          postId: id,
          postUsername: username,
          postTitle: title,
          postDescription: description,
        },
      ],
    });
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={7}>
            <Card.Group itemsPerRow={1}>
              {this.state.posts.map((post) =>
                this.renderPosts(
                  post.postUsername,
                  post.postTitle,
                  post.postDescription,
                  post.postId
                )
              )}
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={3} />
          <Grid.Column width={3}>
            <AddPost savePost={this.savePost} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withRouter(Posts);
