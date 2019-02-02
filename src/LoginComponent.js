import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./LoginComponent.css";
import axios from "axios";

class LoginForm extends React.Component {
  //Shows login or register based on state

  constructor(props) {
    super(props);
    this.state = {
      login: true
    };

    this.changeLoginState = this.changeLoginState.bind(this);
  }

  changeLoginState(e) {
    let login = this.state.login;
    this.setState({
      login: !login
    });

    e.preventDefault();
  }
  componentDidMount(){
    this.props.isActiveCallback();
  }

  render() {
    
    
    let innerComponent;
    if (this.state.login) {
      innerComponent = (
        <div className="innerLogin">
          <LoginComponent setAuthorized={this.props.setAuthorized}/>
          <button className="loginstatebutton" onClick={this.changeLoginState}>
            Not a user yet?
          </button>
        </div>
      );
    } else {
      innerComponent = (
        <div className="innerLogin">
          <RegisterComponent />
          <span className="loginstatebutton" setAuthorized={this.props.setAuthorized} onClick={this.changeLoginState}>
            Already a user?
          </span>
        </div>
      );
    }

    return <div className="login">{innerComponent}</div>;
  }

  //Text modifies itself dynamically. By default shows Not a user? Register. Else shows ALready a user? Login

  //form dynamically changes on pressing login or resiter
}

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.login = this.login.bind(this);
    this.setMessage=this.setMessage.bind(this);
  }

  setMessage(message, authorized){
    this.setState({
      message: message,
      messageClass: authorized?"success-text":"error-text"
    });
  }


  onInputChange(input, e) {
    let state = {};
    state[input] = e.currentTarget.value;
    this.setState(state);
  }

  login(e) {
    axios
      .post("/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        
        this.setState({
          username: "",
          password: "",
          message: "",
          messageClass:""
        });

        this.setMessage("Successfully logged in!", true);

        //set message grteen?

        //redirect to root
        this.props.setAuthorized(true);
      })
      .catch(err => {
        // console.log(err);
        if(err.response.status==401){
          if(err.response.data=="IU")
          {
            this.setMessage("Incorrect Username", false);
          }

          else{
            this.setMessage("Incorrect Password", false);
          }
        }
        console.log(err.response.status);
      });
  }

  render() {
    return (
      <>
        <input
          placeholder="Username"
          value={this.state.username}
          onChange={e => {
            this.onInputChange("username", e);
          }}
          className="username logininput "
        />
        <input
          placeholder="Password"
          value={this.state.password}
          onChange={e => {
            this.onInputChange("password", e);
          }}
          className="password logininput "
          type="password"
        />

        <button onClick={this.login} className="loginbtn">
          Login
        </button>

        <div className={this.state.messageClass}>
        {this.state.message}
        </div>
      </>
    );
  }
}

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.register = this.register.bind(this);
  }

  onInputChange(input, e) {
    let state = {};
    state[input] = e.currentTarget.value;
    this.setState(state);
  }

  register(e) {
    axios
      .post("/registeruser", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
      .then(() => {
        this.setState({
          username: "",
          password: "",
          email: ""
        });
        this.props.setAuthorized(true);
      });
  }

  render() {
    return (
      <>
        <input
          placeholder="Username"
          value={this.state.username}
          onChange={e => {
            this.onInputChange("username", e);
          }}
          className="username logininput "
        />
        <input
          placeholder="Password"
          value={this.state.password}
          onChange={e => {
            this.onInputChange("password", e);
          }}
          className="logininput password"
          type="password"
        />

        <input
          placeholder="Email"
          value={this.state.email}
          onChange={e => {
            this.onInputChange("email", e);
          }}
          className="logininput"
        />
        <button onClick={this.register} className="loginbtn">
          Register
        </button>
      </>
    );
  }
}

export default LoginForm;
// If incorrect password, show oopup
