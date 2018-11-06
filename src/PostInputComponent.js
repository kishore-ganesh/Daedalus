import React, { Component } from "react";
import axios from "axios";
import "./PostInputComponent.css"
class PostInputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titleInput: "",
      contentInput: "",
      fileInput: undefined
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onInputChange(inputname, e) {
    let stateParam = {};
    stateParam[inputname] = e.currentTarget.value;
    this.setState(stateParam);
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
      axios.post("/newpost", {
        title: this.state.titleInput,
        postContent: this.state.contentInput,
        headerImage: imageData
      }).then((response)=>{

          if(!response.data.success){
            console.log("NOT LOGGED IN");

            //display all posts made by  a user
          }

          else{
            this.setState({
              title: "",
              contentInput: "",
              fileInput: ""
          })
          }
          
      });
    });
  }

  render() {
    return (
      <div className="postInputComponent">
        <input
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
      </div>
    );
  }
}


//only shown if authenticated

export default PostInputComponent
