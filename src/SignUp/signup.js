import React, {Component}  from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {getUsername, setUsername} from '../util/username.js';
import {Redirect} from 'react-router';
import targetUrl from '../util/targetUrl.js';
import Snackbar from 'material-ui/Snackbar';

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
    marginBottom: '30px',
    marginTop: '12px'
  }, text: {
    color: '#1A237E',
    textAlign: 'center'
  }
};

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      username: '',
      pass: '',
      passConfirm: '',
      email: '',
      first: '',
      last: ''
    };
    this.showAlert = this.showAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  nameChange(e){
    this.setState({username: e.target.value});
  }

  passChange(e){
    this.setState({pass: e.target.value});
  }

  passConfirmChange(e){
    this.setState({passConfirm: e.target.value});
  }

  emailChange(e){
    this.setState({email: e.target.value});
  }

  firstChange(e){
    this.setState({first: e.target.value});
  }

  lastChange(e){
    this.setState({last: e.target.value});
  }

  checkText(field){
    if(!this.state[field]){
      return 'Required';
    } else {
      return null;
    }
  }

  showAlert = (text) => {
    this.setState({
      open: true,
      message: text
    });
  };

  closeAlert = () => {
    this.setState({
      open: false,
      message: ''
    });
  }

  submit(){

    if(this.state.pass != this.state.passConfirm){
      this.showAlert("Password not match. Try again");
    } else if(!this.state.username || !this.state.pass || !this.state.email ||
              !this.state.first || !this.state.last  ){
      this.showAlert("One or more field missing. Please fix that");
    } else {
      fetch(targetUrl + "/users/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": this.state.username,
          "password": this.state.pass,
          "email": this.state.email,
          "firstName": this.state.first,
          "lastName": this.state.last
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setUsername(responseJson.userID);
        this.context.router.history.push('/courses');
      })
      .catch(() => {
        this.showAlert("User already exist!!");
      });
    }
  }

  render(){
    return (
      <div style={styles.root}>
        <form>
          <h1 style={styles.text}>SIGN UP</h1><br/>
          <TextField
            hintText="Your username here" floatingLabelText="Username:" type="text"
            errorText={this.checkText('username')}
            onChange={this.nameChange.bind(this)} value={this.state.username}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.submit();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your password here" floatingLabelText="Password:" type="password"
            errorText={this.checkText('pass')}
            onChange={this.passChange.bind(this)} value={this.state.pass}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.submit();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Confirm password here" floatingLabelText="Confirm Password:" type="password"
            errorText={this.checkText('passConfirm')}
            onChange={this.passConfirmChange.bind(this)} value={this.state.passConfirm}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.submit();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your email here" floatingLabelText="Email Adress:" type="text"
            errorText={this.checkText('email')}
            onChange={this.emailChange.bind(this)} value={this.state.email}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.submit();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your first name here" floatingLabelText="First Name:" type="text"
            errorText={this.checkText('first')}
            onChange={this.firstChange.bind(this)} value={this.state.first}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.submit();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your last name here" floatingLabelText="Last Name:" type="text"
            errorText={this.checkText('last')}
            onChange={this.lastChange.bind(this)} value={this.state.last}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.submit();
                ev.preventDefault();
              }
            }}
          /><br />

        </form>
        <RaisedButton label="Sign Up" primary={true} style={styles.buttonStyle} fullWidth={true}
          onClick={() => {
            this.submit();
          }}/><br/>
          <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={3000}
            onRequestClose={this.closeAlert}
            bodyStyle={{ backgroundColor: 'red', color: 'coral' }}
          />
      </div>
    );
  }
}

SignUp.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

SignUp.contextTypes = {
  router: React.PropTypes.object,
};

export default SignUp;
