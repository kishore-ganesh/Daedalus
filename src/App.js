import React, { Component } from "react";

import axios from "axios";
import "./App.css";

import BlogPost from "./BlogPostComponent";
import PostInputComponent from "./PostInputComponent";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NavBar from "./NavBarComponent";
import LoginForm from "./LoginComponent";
import UsersPageComponent from './UsersPageComponent';

//deal with state immutability?
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      authorized: false
    };

    setInterval(60000, this.getPosts);
    this.updatePostState = this.updatePostState.bind(this);
    this.setAuthorized=this.setAuthorized.bind(this);
  }

  sendUpdatedPost(post) {
    axios.post("/likedpost", { post: post });
  }

  setAuthorized(value) {
   
    this.setState({
      authorized: value
    });
  }

  //at any point if not authorized anywhere, authorize it

  //can make this more efficient by mapping to id
  updatePostState(post) {
    this.setState(state => {
      for (let j = 0; j < state.posts.length; j++) {
        if (state.posts[j]._id.toString() == post._id.toString()) {
          if (state.posts[j].liked == undefined) {
            state.posts[j].liked = true;
          }

          if (!state.posts[j].stars) {
            state.posts[j].stars = 0;
          }
          state.posts[j].liked = !state.posts[j].liked;
          if (state.posts[j].liked) {
            state.posts[j].stars++;
          } else {
            state.posts[j].stars--;
          }

          this.sendUpdatedPost(state.posts[j]);
        }
      }

      return state;
      //make this pure
    });
  }

  getPosts() {
    axios.post("/posts").then(response => {
      console.log(response.data);

      response.data.sort((a, b) => {
        return a._id > b._id;
      });
      this.setState({
        posts: response.data
      });
    });
  }

  findIfAuthorized() {
    axios.post("/isAuthorized").then(response => {
      this.setState({
        authorized: response.data.authorized
      });
    });
  }

  componentDidMount() {
    this.getPosts();
    this.findIfAuthorized();
  }
  render() {
    let postitems = this.state.posts.map(item => {
      return (
        <BlogPost
          key={item._id}
          post={item}
          postUpdateCallback={this.updatePostState}
        />
      );
    });

    return (
      <Router>
        <div className="mainBody">
          <NavBar
            authorized={this.state.authorized}
            setAuthorized={this.setAuthorized}
          />
          <div className="innerBody">
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return <>{postitems}</>;
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
