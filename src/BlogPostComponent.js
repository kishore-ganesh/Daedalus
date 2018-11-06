import React, { Component } from "react";
import './BlogPostComponent.css'
class BlogPost extends React.Component {
    render() {
      return (
        <div className="blog-post">
          <h2 className="post-title">{this.props.title}</h2>
          <div className="authorinfo">
          {this.props.author}
          </div>
          <img className="headerimage" src={this.props.headerImage} />
  
          <div className="postcontent">{this.props.postContent}</div>
        </div>
      );
    }
  }


  export default BlogPost