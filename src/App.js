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

    setInterval(60000, this.getPosts);
    this.updatePostState=this.updatePostState.bind(this);
  }

  sendUpdatedPost(post){
    axios.post("/likedpost", {post: post});
  }

      //can make this more efficient by mapping to id
  updatePostState(post){
      this.setState((state)=>{
        for(let j=0;j<state.posts.length; j++){
        
          if(state.posts[j]._id.toString()==post._id.toString()){
            if(state.posts[j].liked==undefined){
              state.posts[j].liked=true;
              
            }

            if(!state.posts[j].stars){
              state.posts[j].stars=0;
            }
            state.posts[j].liked=!state.posts[j].liked;
            if(state.posts[j].liked){
              state.posts[j].stars++;
            }

            else{
              state.posts[j].stars--;
            }
            
            this.sendUpdatedPost(state.posts[j]);
          }
        }

        return state; 
        //make this pure
      })
  }

  getPosts(){
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

  componentDidMount() {
    this.getPosts();
  }
  render() {
    let postitems = this.state.posts.map(item => {
     
      return (
        <BlogPost key={item._id}
         post= {item}
         postUpdateCallback = {this.updatePostState}
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
