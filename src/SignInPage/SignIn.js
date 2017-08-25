import React, {Component}  from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
// import styles from './SignIn.scss';

var styles = {
  root: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 150,
    height: 150
  },
  alertOptions: {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }
}

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      userName: ''
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  showAlert = () => {
    this.msg.show('Username is wrong. Please try again', {
      time: 2000,
      type: 'error',
    })
  }

  checkUser(){
    //waiting for API endpoint
    // axios.get('/{this.state.userName}')
    //   .then(function (response) {
    //     Router.transitionTo('/courses');
    //   })
    //   .catch(function (error) {
    //     showAlert();
    //   });
  }

  render(){
    return (
      <div style={styles.root}>
        <form>
          <h1>Sign in</h1><br/>
          <TextField
            hintText="Your name here"
            floatingLabelText="What is your name?"
            type="text"
            value= {this.state.userName}
          /><br />
          <RaisedButton label="Primary" primary={true} onClick={this.checkUser()}/>
        </form>
      </div>
    )
  }
}

SignIn.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default SignIn