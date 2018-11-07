import React from "react";
import axios from "axios";
import BlogPost from "./BlogPostComponent";

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedPosts: [],
      user: null,
    };
  }

  componentDidMount() {

    axios.post('/getUserInfo').then(response=>{
        this.setState({
            user: response.data
        })
    })
    axios.post("/getLikedPosts").then(response => {
      response.data.sort((a, b) => {
        return a._id > b._id;
      });

      this.setState({
        likedPosts: response.data
      });
    });
  }
  render() {
    //have callback too

    let likedPosts = this.state.likedPosts.map(post => {
      return <BlogPost key={post._id} post={post} />;
    });
    return <div className="users-page">
    <h2>Liked Posts</h2>
    {likedPosts}</div>;
  }
}

export default UsersPage
