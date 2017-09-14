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
  buttonStyle: {
    marginBottom: 12,
    marginTop: 12
  }, text: {
    color: '#1A237E',
    textAlign: 'center'
  }
};

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      pass: '',
      passConfirm: '',
      email: '',
      first: '',
      last: ''
    };
    this.props = {
      touched: '',
      error: ''
    }
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

  signUp(){

  }

  render(){
    return (
      <div style={styles.root}>
        <form>
          <h1 style={styles.text}>SIGN UP</h1><br/>
          <TextField
            hintText="Your username here" floatingLabelText="Username:" type="text"
            errorText={this.state.touched && this.state.error}
            onChange={this.nameChange.bind(this)} value={this.state.username}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your password here" floatingLabelText="Password:" type="password"
            errorText={this.state.touched && this.state.error}
            onChange={this.passChange.bind(this)} value={this.state.pass}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Confirm password here" floatingLabelText="Confirm Password:" type="password"
            errorText={this.state.touched && this.state.error}
            onChange={this.passConfirmChange.bind(this)} value={this.state.passConfirm}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your email here" floatingLabelText="Email Adress:" type="text"
            errorText={this.state.touched && this.state.error}
            onChange={this.emailChange.bind(this)} value={this.state.email}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your first name here" floatingLabelText="First Name:" type="text"
            errorText={this.state.touched && this.state.error}
            onChange={this.firstChange.bind(this)} value={this.state.first}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your last name here" floatingLabelText="Last Name:" type="text"
            errorText={this.state.touched && this.state.error}
            onChange={this.lastChange.bind(this)} value={this.state.last}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />

        </form>
        <RaisedButton label="Sign Up" primary={true} style={styles.buttonStyle} fullWidth={true}
          onClick={() => {
            this.signUp();
          }}/><br/>
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
