import axios from "axios";
import react from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";

class AddPost extends react.Component {
  state = {
    modalOpen: false,
    username: "",
    postTitle: "",
    postContent: "",
  };

  handlePostSave = () => {
    const { username, postTitle, postContent } = this.state;

    axios
      .post("http://localhost:8080/posts", {
        postUsername: username,
        postTitle: postTitle,
        postDescription: postContent,
      })
      .then((response) => {
        let postId = response.data.postId;
        this.props.savePost(username, postTitle, postContent, postId);
      });
    this.setState({
      modalOpen: false,
      username: "",
      postTitle: "",
      postContent: "",
    });
  };

  renderModal = () => {
    return (
      <Modal
        dimmer="blurring"
        open={this.state.modalOpen}
        onClose={() =>
          this.setState({
            modalOpen: false,
            username: "",
            postTitle: "",
            postContent: "",
          })
        }
      >
        <Modal.Header>ASK ME SOMETHING</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              value={this.state.username}
              onChange={(event) =>
                this.setState({
                  username: event.target.value,
                })
              }
              label="Username"
              placeholder="Enter your user name"
            />
            <Form.Input
              value={this.state.postTitle}
              onChange={(event) =>
                this.setState({
                  postTitle: event.target.value,
                })
              }
              label="Post Title"
              placeholder="Enter post title"
            />
            <Form.TextArea
              value={this.state.postContent}
              onChange={(event) =>
                this.setState({
                  postContent: event.target.value,
                })
              }
              label="Post Content"
              placeholder="Enter post content"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handlePostSave}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  handleAddPost = () => {
    this.setState({
      modalOpen: true,
    });
  };

  render() {
    return (
      <div>
        <Button
          className="add-button-background"
          onClick={this.handleAddPost}
          icon
        >
          <Icon color="green" size="huge" name="plus circle" />
        </Button>
        {this.renderModal()}
      </div>
    );
  }
}

export default AddPost;
