import React, {Component}  from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {getUsername, setUsername} from '../util/username.js';
import {Redirect} from 'react-router';
import targetUrl from '../util/targetUrl.js';

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
  buttonStyle: {
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
      open: false,
      username: getUsername(),
      signUpRedirect: false,
      fieldName: '',
      fieldPassword: ''
    };
    this.logIn = this.logIn.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  logIn(name, pass) {

      if(!name || !pass){
        this.showAlert();
      } else {
        fetch(targetUrl + "/login/", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
        .catch(() => {
            this.showAlert();
        });
      }
  }

  checkUser(){
    this.logIn(this.state.fieldName, this.state.fieldPassword);
    this.forceUpdate();
  }

  signUp(){
    this.setState({signUpRedirect: true});
    this.forceUpdate();
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

  showAlert = () => {
    this.setState({
      open: true,
    });
  };

  closeAlert = () => {
    this.setState({
      open: false
    });
  };

  render(){
    if (this.state.username != null) {
      return <Redirect to='/courses'/>;
    }
    if(this.state.signUpRedirect == true){
      return <Redirect to='/signup' />
    }
    return (
      <div style={styles.root}>
        <form>
          <h1 style={styles.text}>SIGN IN</h1><br/>
          <TextField
            hintText="Your name here"
            hintStyle={{color: '#fff'}}
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
            type="password"
            onChange={this.handlePassChange.bind(this)}
            value={this.state.fieldPassword}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.checkUser();
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
          <Snackbar
            open={this.state.open}
            message="Invalid login info. Please try again"
            autoHideDuration={2000}
            onRequestClose={this.closeAlert}
            bodyStyle={{ backgroundColor: 'red', color: 'coral' }}
          />
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
