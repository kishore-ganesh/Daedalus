import React from "react";
import { Link } from "react-router-dom";
import "./NavBarComponent.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tabno) {
    this.setState({
      activeTab: tabno
    });
  }

  render() {
    return (
      <ul className="navBar">
        <li
          className={"navItem" + (this.state.activeTab == 0 ? " selected" : "")}
        >
          <Link
            to="/"
            onClick={() => {
              this.changeTab(0);
            }}
          >
            All Posts
          </Link>
        </li>
        <li
          className={"navItem" + (this.state.activeTab == 1 ? " selected" : "")}
        >
          <Link
            to="/new"
            onClick={() => {
              this.changeTab(1);
            }}
          >
            New Post
          </Link>
        </li>
        <li
          className="navItem"
          className={"navItem" + (this.state.activeTab == 2 ? " selected" : "")}
        >
          <Link
            to="/login"
            onClick={() => {
              this.changeTab(2);
            }}
          >
            Login
          </Link>
        </li>
      </ul>
    );
  }
}
// tagged
//add to actuve calss

export default NavBar;
