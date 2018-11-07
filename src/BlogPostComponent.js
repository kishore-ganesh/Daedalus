import React, { Component } from "react";
import './BlogPostComponent.css'
import axios from 'axios'

class BlogPost extends React.Component {

    constructor(props)
    {
      super(props);
      this.state={
        starClass: props.post.liked?"fas fa-star":"far fa-star"
      }

      this.onHover=this.onHover.bind(this);
      this.onMouseOut=this.onMouseOut.bind(this);
      this.updateLikes=this.updateLikes.bind(this);
    }

    onHover(){
      this.setState({
        starClass: "fas fa-star"
      })
    }

    onMouseOut(){
      if(!this.props.post.liked){
        this.setState({
          starClass: "far fa-star"
        })
      }
      
    }

    updateLikes(){
      // console.log("A");
      this.props.postUpdateCallback(this.props.post);
     
    }
    render() {
  
      return (
        
        <div className="blog-post">
          <h2 className="post-title">{this.props.post.title}</h2>
          <div className="authorinfo">
          {this.props.post.author}
          </div>
          <img className="headerimage" src={this.props.post.headerImage} />
  
          <div className="postcontent">{this.props.post.postContent}</div>
          <div className="bottombar">
          <div className="likeelement">
          <i className={this.state.starClass} onMouseOver={this.onHover} onClick={this.updateLikes} onMouseOut={this.onMouseOut}></i>
          <span className="likenumber">{this.props.post.stars}</span>
          </div>
          
          </div>
        </div>
      );
    }
  }


  export default BlogPost

  // add way to persist if liked by user