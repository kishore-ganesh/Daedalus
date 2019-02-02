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
        { name: "Login", path: "/login", needsLogin: false }
        // { name: "User Page", path: "/userpage", needsLogin: true }
      ]
    };

    // this.changeTab = this.changeTab.bind(this);
  }

  // changeTab(tabno) {
  //   this.setState((state)=>{
  //     console.log("SETTING STATE");
  //     if(state.activeTab!=tabno)
  //     {
  //       return {...state, activeTab: tabno}
  //     }

  //     else{
  //       return state;
  //     }
      
  //   });
  // }

  render() {
    
    let navElements = [];

    for (let i = 0; i < this.state.navElements.length; i++) {
      let element = this.state.navElements[i];
      if (this.props.authorized) {
        navElements.push(
          <li
            key={element.name}
            className={
              "navItem" + (this.props.activeTab == i ? " selected" : "")
            }
          >
            <Link
              to={element.path}
    
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
                "navItem" + (this.props.activeTab == i ? " selected" : "")
              }
            >
              <Link
                to={element.path}
                
              >
                {element.name}
              </Link>
            </li>
          );
        }
      }
    }

    let userinfo;
    
    if (this.props.authorized) {
      userinfo = (
        <li className={"navItem" + (this.props.activeTab == 3 ? " selected" : "")}>
          <Link
            to="/userpage"
          
          >
          <i className="fa fa-user" aria-hidden="true"></i>

          </Link>
        </li>
      );
    }
    // navElements.push();
    return (
      <ul className="navBar">
        <li>
          <ul className="innerNav">{navElements}</ul>
        </li>
        <li>
          <ul className="innerNav">
          {userinfo}
            <li>
              <button className="logoutbtn" onClick={this.props.logout}>
                <i className="fas fa-sign-out-alt" />
              </button>
            </li>

            
          </ul>
        </li>
      </ul>
    );
  }
}
// tagged
//add to actuve calss

export default NavBar;
