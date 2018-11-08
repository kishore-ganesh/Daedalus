import React from "react";
import axios from "axios";
import BlogPost from "./BlogPostComponent";
import './UsersPageComponent.css'

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedPosts: [],
      user: null,
      message: ""
    };

    this.setMessage=this.setMessage.bind(this);
  }

  setMessage(message){
    this.setState({
      message: message
    })
  }

  componentDidMount() {

    if(this.props.authorized){
      axios
      .post("/getUserInfo")
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(err => {
        if (err.response.status == 401) {
          this.props.setAuthorized(false);
        }
      });
    axios
      .post("/getLikedPosts")
      .then(response => {
        response.data.sort((a, b) => {
          return a._id > b._id;
        });

        this.setState({
          likedPosts: response.data
        });
      })
      .catch(err => {
        if (err.response.status == 401) {
          this.props.setAuthorized(false);
        }
      });
    }

    else{
      this.setMessage("You need to be logged in")
    }

  }
  render() {
    //have callback too

    let likedPosts = this.state.likedPosts.map(post => {
      return <BlogPost key={post._id} post={post} />;
    });
    return (
      <div className="users-page">
        <h2>Liked Posts</h2>
        {likedPosts}

        <div className="status error-text">
        {this.state.message}
        </div>
      </div>
    );
  }
}

export default UsersPage;
