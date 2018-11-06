import React, { Component } from "react";

import axios from "axios";
import "./App.css";

import BlogPost from "./BlogPostComponent";
import PostInputComponent from "./PostInputComponent";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NavBar from "./NavBarComponent";
import LoginForm from "./LoginComponent";

//deal with state immutability?
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.post("/posts").then(response => {
      console.log(response.data);

      response.data.sort((a, b)=>{
        return a._id>b._id
      })
      this.setState({
        posts: response.data
      });
    });
  }
  render() {
    let postitems = this.state.posts.map(item => {
      console.log(item.headerImage);
      return (
        <BlogPost
          key={item.title}
          title={item.title}
          author={item.author}
          postContent={item.postContent}
          headerImage={item.headerImage}
        />
      );
    });

    return (
      <Router>
        <div className="mainBody">
          <NavBar />
          <div className="innerBody">
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return <>{postitems}</>;
                }}
              />
              <Route path="/new" component={PostInputComponent} />
              <Route path="/login" component={LoginForm} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

//each post should havve stars. We should have proper author profiles with author images
