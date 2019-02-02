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
     
      authorized: false,
      activePage: 0
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

  setActive(value){
    
    console.log("SET ACTIVE CALLED");
    this.setState((state)=>{
      console.log(state+" "+value);
      if(state.activePage!=value)
      {
        return {...state, activePage: value};
      }

      else{
        return state;
      }
      
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
  //  console.log("RERENDER");
   //Each time it is mounted, it calls for posts, and once it gets posts, it is mounted again

    return (
      <Router>
        <div className="mainBody">
          <NavBar
            authorized={this.state.authorized}
            setAuthorized={this.setAuthorized}
            logout={this.logout}
            activeTab={this.state.activePage}
          />
          <div className="innerBody">
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return <BlogPostList isActiveCallback={()=>{
                    this.setActive(0);
                  }}/>
                }}
              />
              <Route
                path="/new"
                render={() => {
                  {
                    return (
                      <>
                        <PostInputComponent
                          authorized={this.state.authorized}
                          setAuthorized={this.setAuthorized}
                          isActiveCallback={()=>{
                            this.setActive(1);
                          }}
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
                        isActiveCallback={()=>{
                          this.setActive(2);
                        }}
                      />
                    </>
                  );
                }}
              />
              <Route
                path="/userpage"
                render={() => {
                  return (
                    <>
                      <UsersPageComponent
                        authorized={this.state.authorized}
                        setAuthorized={this.setAuthorized}
                        isActiveCallback={()=>{
                          this.setActive(3);
                        }}
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
