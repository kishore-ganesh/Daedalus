import React, { Component } from "react";
import axios from "axios";
import "./PostInputComponent.css";
class PostInputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titleInput: "",
      contentInput: "",
      fileInput: undefined,
      message: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  onInputChange(inputname, e) {
    let stateParam = {};
    stateParam[inputname] = e.currentTarget.value;
    this.setState(stateParam);
  }

  setMessage(message) {
    this.setState({
      message: message
    });
  }

  onFileChange(e) {
    this.setState({
      fileInput: e.currentTarget.files[0]
    });
  }

  uploadImage(fileName) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
      if (fileName) {
        reader.readAsDataURL(fileName);
      } else {
        console.log("INVALID");
        resolve();
      }
    });
  }

  onClick(e) {
    this.uploadImage(this.state.fileInput).then(imageData => {
      console.log(imageData);
      axios
        .post("/newpost", {
          title: this.state.titleInput,
          postContent: this.state.contentInput,
          headerImage: imageData
        })
        .then(response => {
          if (!response.data.success) {
            console.log("NOT LOGGED IN");

            //display all posts made by  a user
          } else {
            this.setState({
              titleInput: "",
              contentInput: "",
              fileInput: ""
            });
          }
        }).catch(err=>{
          this.setMessage("You need to be logged in to do that");
        });
    });
  }

  componentDidMount(){
    this.props.isActiveCallback();
  }

  render() {
    
    return (
      <div className="postInputComponent">
        <input
          className="titleInput"
          value={this.state.titleInput}
          placeholder="Enter Title"
          onChange={e => {
            this.onInputChange("titleInput", e);
          }}
        />
        <textarea
          className="contentInput"
          value={this.state.contentInput}
          placeholder="Enter Post Content"
          onChange={e => {
            this.onInputChange("contentInput", e);
          }}
        />

        <input type="file" onChange={this.onFileChange} />
        <button className="submit" onClick={this.onClick}>
          Submit Post
        </button>

        <div className="status error-text">{this.state.message}</div>
      </div>
    );
  }
}

//only shown if authenticated

export default PostInputComponent;
