import react from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class Navbar extends react.Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (event, props) => {
    this.setState({
      activeItem: props.name,
    });
  };

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <NavLink to="/">
            <Menu.Item
              name="home"
              active={this.state.activeItem === "home"}
              onClick={this.handleItemClick}
              as="div"
            />
          </NavLink>
          <NavLink to="/dadJokes">
            <Menu.Item
              name="dad-jokes"
              active={this.state.activeItem === "dad-jokes"}
              onClick={this.handleItemClick}
              as="div"
            />
          </NavLink>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
