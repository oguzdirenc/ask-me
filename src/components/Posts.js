import react from "react";
import { Card, Grid } from "semantic-ui-react";
import AddPost from "./AddPost";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";

class Posts extends react.Component {
  state = {
    posts: [
      {
        username: "askjdhakfhhsfd",
        title: "dalksdlksdgnvsldmnvlkwemflndfblkdnfv",
        description: "sflknlfnsakjglbldkfjbvkldrsjbgdb",
        id: 2,
      },
    ],
  };

  renderPosts = (username, title, description, id) => {
    return (
      <Card
        style={{ wordWrap: "break-word" }}
        key={id}
        onClick={() => this.props.history.push(`/postDetails/${id}`)}
      >
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={13}>
                <Card.Description>{description}</Card.Description>
              </Grid.Column>
              <Grid.Column width={3}>
                <Card.Meta>{username}</Card.Meta>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  };

  savePost = (username, title, description) => {
    this.setState({
      posts: [
        ...this.state.posts,
        {
          id: uuidv4(),
          username: username,
          title: title,
          description: description,
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
                  post.username,
                  post.title,
                  post.description,
                  post.id
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
