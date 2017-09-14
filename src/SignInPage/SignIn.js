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

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      username: getUsername(),
      fieldValue: ''
    };
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

  checkUser(){
    this.signUp();
  }

  signUp(){
    setUsername(this.state.fieldValue);
    this.setState({username: getUsername()});
  }

  _handleTextFieldChange(e) {
    this.setState({
      fieldValue: e.target.value
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
            floatingLabelText="What is your name?"
            type="text"
            onChange={this._handleTextFieldChange.bind(this)}
            value={this.state.fieldValue}
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
