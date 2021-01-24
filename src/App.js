import { Grid } from "semantic-ui-react";
import "./App.css";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import DadJokes from "./components/DadJokes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Grid>
            <Grid.Row>
              <Navbar />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Switch>
                  <Route path="/" component={Posts} exact></Route>
                  <Route
                    path="/postDetails/:id"
                    component={PostDetails}
                  ></Route>
                  <Route path="/dadJokes" component={DadJokes}></Route>
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
