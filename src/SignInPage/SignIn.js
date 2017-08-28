import React, {Component}  from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
//import {browserHistory} from 'react-router'
// import styles from './SignIn.scss';

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
}

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      userName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  showAlert(){
    this.msg.show('Username is wrong. Please try again', {
      time: 2000,
      type: 'error',
    })
  }

  checkUser(){
    //waiting for API endpoint
    // axios.get('/{this.state.userName}')
    //   .then(function (response) {
    //     this.context.router.history.push('/courses');
    //   })
    //   .catch(function (error) {
    //     this.showAlert();
    //   });
    alert(this.state.userName);
    this.context.router.history.push('/courses');
  }

  signUp(){
    //waiting for API endpoint
    // axios.post('/{this.state.userName}')
    //   .then(function (response) {
    //
    //   })
    //   .catch(function (error) {
    //
    //   });
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  }

  render(){
    return (
      <div style={styles.root}>
        <form>
          <h1 style={styles.text}>SIGN IN</h1><br/>
          <TextField
            hintText="Your name here"
            floatingLabelText="What is your name?"
            type="text"
            value= {this.state.userName}
            onChange={this.handleChange}
          /><br />
        </form>
        <RaisedButton label="Log in" primary={true} style={styles.buttonStyle} fullWidth={true}
                      onClick={() => {this.checkUser()}}/><br/>
        <label style={styles.text}>Do not have an account? </label>
        <RaisedButton label="Sign up" primary={true} style={styles.buttonStyle}
                      onClick={() => {this.signUp()}}/>
      </div>
    )
  }
}

SignIn.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

SignIn.contextTypes = {
  router: React.PropTypes.object,
};

export default SignIn
