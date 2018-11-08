import React, { Component } from "react";

import axios from "axios";
import "./App.css";

import BlogPost from "./BlogPostComponent";
import PostInputComponent from "./PostInputComponent";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NavBar from "./NavBarComponent";
import LoginForm from "./LoginComponent";
import UsersPageComponent from './UsersPageComponent';
import BlogPostList from './BlogPostListComponent'

//deal with state immutability?
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      authorized: false
    };

    
    this.setAuthorized=this.setAuthorized.bind(this);
    this.logout=this.logout.bind(this);
    this.findIfAuthorized=this.findIfAuthorized.bind(this);
    
  }

  

  setAuthorized(value) {
   
    this.setState({
      authorized: value
    });
  }

  logout(){
    axios.post("/logout").then((response)=>{
      this.setAuthorized(false);
    })
  }

  //at any point if not authorized anywhere, authorize it

  //can make this more efficient by mapping to id
 


  findIfAuthorized() {
    axios.post("/isAuthorized").then(response => {
      this.setState({
        authorized: response.data.authorized
      });
    });
  }

  componentDidMount() {
    this.findIfAuthorized();
  }
  render() {
   console.log("RERENDER");
   //Each time it is mounted, it calls for posts, and once it gets posts, it is mounted again

    return (
      <Router>
        <div className="mainBody">
          <NavBar
            authorized={this.state.authorized}
            setAuthorized={this.setAuthorized}
            logout={this.logout}
          />
          <div className="innerBody">
            <Switch>
              <Route
                path="/"
                exact
                component={() => {
                  return <BlogPostList/>
                }}
              />
              <Route
                path="/new"
                component={() => {
                  {
                    return (
                      <>
                        <PostInputComponent
                          authorized={this.state.authorized}
                          setAuthorized={this.setAuthorized}
                        />
                      </>
                    );
                  }
                }}
              />
              <Route
                path="/login"
                render={() => {
                  return (
                    <>
                      <LoginForm
                        authorized={this.state.authorized}
                        setAuthorized={this.setAuthorized}
                      />
                    </>
                  );
                }}
              />
              <Route
                path="/userpage"
                component={() => {
                  return (
                    <>
                      <UsersPageComponent
                        authorized={this.state.authorized}
                        setAuthorized={this.setAuthorized}
                      />
                    </>
                  );
                }}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
//add redux later
export default App;

//each post should havve stars. We should have proper author profiles with author images
