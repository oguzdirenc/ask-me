import axios from "axios";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "semantic-ui-react";
import { Card, Grid, Form, Button } from "semantic-ui-react";

export class PostDetails extends Component {
  state = {
    comments: [],
    post: {},
    commentDescription: "",
    commentUsername: "",
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/posts/post/${this.props.match.params.id}`)
      .then((response) =>
        this.setState({
          post: response.data,
          comments: response.data.commentList,
        })
      );
  }

  handleCommentSave = () => {
    axios
      .post(`http://localhost:8080/comments/${this.props.match.params.id}`, {
        commentDescription: this.state.commentDescription,
        commentUsername: this.state.commentUsername,
      })
      .then((response) =>
        this.setState({
          comments: [...this.state.comments, response.data],
          commentUsername: "",
          commentDescription: "",
        })
      );
  };

  renderPost = () => {
    return (
      <Card style={{ wordWrap: "break-word" }} key={uuidv4()}>
        <Card.Content>
          <Card.Header>{this.state.post.postTitle}</Card.Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={13}>
                <Card.Description>
                  {this.state.post.postDescription}
                </Card.Description>
              </Grid.Column>
              <Grid.Column width={3}>
                <Card.Meta>{this.state.post.postUsername}</Card.Meta>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  };

  renderComments = (description, username) => {
    return (
      <Comment key={uuidv4()}>
        <Comment.Avatar src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" />
        <Comment.Content>
          <Comment.Author as="a">{username}</Comment.Author>

          <Comment.Text>{description}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  };

  render() {
    return (
      <div>
        <Card.Group>{this.renderPost()}</Card.Group>

        <Comment.Group>
          {this.state.comments.map((comment) =>
            this.renderComments(
              comment.commentDescription,
              comment.commentUsername
            )
          )}
          <Form reply>
            <Form.Input
              value={this.state.commentUsername}
              onChange={(event) =>
                this.setState({
                  commentUsername: event.target.value,
                })
              }
              label="Username"
              placeholder="Enter your user name"
            />
            <Form.TextArea
              value={this.state.commentDescription}
              onChange={(event) =>
                this.setState({
                  commentDescription: event.target.value,
                })
              }
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              onClick={this.handleCommentSave}
            />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

export default PostDetails;
