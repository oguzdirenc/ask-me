import axios from "axios";
import React, { Component } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export class DadJokes extends Component {
  state = {
    joke: "",
    loading: false,
  };

  componentDidMount() {
    /* axios
      .get("https://icanhazdadjoke.com/", {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) =>
        this.setState({
          joke: response.data.joke,
        })
      )
      .catch((error) => console.log(error)); */

    this.setState({ loading: true }, () => {
      axios
        .get("https://icanhazdadjoke.com/", {
          headers: {
            accept: "application/json",
          },
        })
        .then((response) =>
          this.setState({
            joke: response.data.joke,
            loading: false,
          })
        )
        .catch((error) => console.log(error));
    });
  }
  render() {
    return (
      <div>
        {this.state.loading && (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        )}

        <h1>{this.state.joke}</h1>
      </div>
    );
  }
}

export default DadJokes;
