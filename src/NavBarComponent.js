import React from "react";
import { Link } from "react-router-dom";
import "./NavBarComponent.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      navElements: [
        { name: "All Posts", path: "/", needsLogin: false },
        { name: "New Post", path: "/new", needsLogin: true },
        { name: "Login", path: "/login", needsLogin: false },
        { name: "User Page", path: "/userpage", needsLogin: true }
      ]
    };

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tabno) {
    this.setState({
      activeTab: tabno
    });
  }

  render() {
    let navElements = [];

    for (let i = 0; i < this.state.navElements.length; i++) {
      let element = this.state.navElements[i];
      if (this.props.authorized) {
        navElements.push(
          <li
            key={element.name}
            className={
              "navItem" + (this.state.activeTab == i ? " selected" : "")
            }
          >
            <Link
              to={element.path}
              onClick={() => {
                this.changeTab(i);
              }}
            >
              {element.name}
            </Link>
          </li>
        );
      } else {
        if (!element.needsLogin) {
          navElements.push(
            <li
              key={element.name}
              className={
                "navItem" + (this.state.activeTab == i ? " selected" : "")
              }
            >
              <Link
                to={element.path}
                onClick={() => {
                  this.changeTab(i);
                }}
              >
                {element.name}
              </Link>
            </li>
          );
        }
      }
    }
    // navElements.push();
    return <ul className="navBar">{navElements}</ul>;
  }
}
// tagged
//add to actuve calss

export default NavBar;
