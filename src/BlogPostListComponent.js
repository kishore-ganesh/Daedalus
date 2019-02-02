import React from "react";
import BlogPost from "./BlogPostComponent";
import axios from 'axios';

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    
    this.getPosts = this.getPosts.bind(this);

    this.updatePostState = this.updatePostState.bind(this);
    this.state={
        posts: [],
      
    }
  }

  componentDidMount() {
    this.props.isActiveCallback();
    this.setState({
      intervalCallback: setInterval(60000, this.getPosts)
    });
    console.log("MOUNTING");
    this.getPosts();
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalCallback);
  }


  sendUpdatedPost(post) {
    axios.post("/likedpost", { post: post });
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

  updatePostState(updatedPost) {
    this.setState(state => {
      state.posts = state.posts.map(post => {
        if (post._id.toString() == updatedPost._id.toString()) {
          let newpost = Object.assign({}, post);
          if (newpost.liked == undefined) {
            newpost.liked = false;
          }

          if (!newpost.stars) {
            newpost.stars = 0;
          }
          newpost.liked = !newpost.liked;
          if (newpost.liked) {
            newpost.stars++;
          } else {
            newpost.stars--;
          }

          this.sendUpdatedPost(newpost);
          return newpost;
        } else {
          return post;
        }
      });

      return state;

      //make this pure
    });
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

    return <>{postitems}</>;
  }
}

export default BlogPostList;
