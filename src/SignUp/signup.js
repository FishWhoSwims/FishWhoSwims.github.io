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

    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  signUp(){

  }

  render(){
    return (
      <div style={styles.root}>
        <form>
          <h1 style={styles.text}>SIGN Up</h1><br/>
          <TextField hintText="Your username here" floatingLabelText="Username:" type="text"
            onChange={this._handleTextFieldChange.bind(this)} value={this.state.fieldValue}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your password here" floatingLabelText="Password:" type="text"
            onChange={this._handleTextFieldChange.bind(this)} value={this.state.fieldValue}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your email here" floatingLabelText="Email Adress:" type="text"
            onChange={this._handleTextFieldChange.bind(this)} value={this.state.fieldValue}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your first name here" floatingLabelText="First Name:" type="text"
            onChange={this._handleTextFieldChange.bind(this)} value={this.state.fieldValue}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.signUp();
                ev.preventDefault();
              }
            }}
          /><br />
          <TextField
            hintText="Your last name here" floatingLabelText="Last Name:" type="text"
            onChange={this._handleTextFieldChange.bind(this)} value={this.state.fieldValue}
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
