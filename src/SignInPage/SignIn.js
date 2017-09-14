import React, {Component}  from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {getUsername, setUsername} from '../util/username.js';
import {Redirect} from 'react-router';

var styles = {
  root: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 300,
    height: 300
  },
  alertOptions: {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }, buttonStyle: {
    marginBottom: 12,
    marginTop: 12
  }, text: {
    color: '#1A237E',
    textAlign: 'center'
  }
};

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      username: getUsername(),
      fieldName: '',
      fieldPassword: ''
    };
    this.logIn = this.logIn.bind(this);

  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  showAlert() {
    this.msg.show('Username is wrong. Please try again', {
      time: 2000,
      type: 'error',
    });
  }

  logIn(name, pass) {

      if(!name || !pass){

      } else {
        var targetUrl = 'http://ec2-34-209-20-30.us-west-2.compute.amazonaws.com/API/';
        fetch(targetUrl + "login/", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"username": name, "password": pass})
        })
        .then((response) => response.json())
        .then((responseJson) => {
          setUsername(responseJson.userID);
          this.setState({
            username: responseJson.userID
          });
        })
      }
  }

  checkUser(){
    //setUsername();
    this.logIn(this.state.fieldName, this.state.fieldPassword);
    this.forceUpdate();
  }

  signUp(){

  }

  handleNameChange(e) {
    this.setState({
      fieldName: e.target.value
    });
  }

  handlePassChange(e) {
    this.setState({
      fieldPassword: e.target.value
    });
  }

  render(){
    if (this.state.username != null) {
      return <Redirect to='/courses'/>;
    }
    return (
      <div style={styles.root}>
        <form>
          <h1 style={styles.text}>SIGN IN</h1><br/>
          <TextField
            hintText="Your name here"
            floatingLabelText="Name: "
            type="text"
            onChange={this.handleNameChange.bind(this)}
            value={this.state.fieldName}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your password here"
            floatingLabelText="Password: "
            type="text"
            onChange={this.handlePassChange.bind(this)}
            value={this.state.fieldPassword}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
        </form>
        <RaisedButton label="Log in" primary={true} style={styles.buttonStyle} fullWidth={true}
          onClick={() => {
            this.checkUser();
          }}/><br/>
        <label style={styles.text}>Do not have an account? </label>
        <RaisedButton label="Sign up" primary={true} style={styles.buttonStyle}
          onClick={() => {
            this.signUp();
          }}/>
      </div>
    );
  }
}

SignIn.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

SignIn.contextTypes = {
  router: React.PropTypes.object,
};

export default SignIn;
