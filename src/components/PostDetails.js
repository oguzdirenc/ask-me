import React, { Component } from "react";

export class PostDetails extends Component {
  render() {
    return <div>{this.props.match.params.id}</div>;
  }
}

export default PostDetails;
