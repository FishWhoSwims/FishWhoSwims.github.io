import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import Assignments from './Assignments/Assignments.js';
import {getUsername} from './util/username.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import RouteChange from './RouteChange'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: getUsername(),
    };
  }

  logout() {
    window.localStorage.removeItem('username');
    window.location = '/';
  }

  isLogInPage(){
    if(this.props.pathName === '/'){
      console.log('log in');
      return true;
    } else {
      return false;
    }
  }

  render() {
    return   (
      <main>
        <MuiThemeProvider>
        {
        !this.isLogInPage()
        ? <AppBar
            onLeftIconButtonTouchTap={() => {
              window.location = '/courses';
            }}
            onRightIconButtonTouchTap={this.logout.bind(this)}
            iconElementLeft={<img style={{width:50}} src='img/swimmingfish.jpeg'/>}
            iconElementRight={<p style={{cursor: 'pointer'}}>Logout</p>}
          />
        : null
        }
        </MuiThemeProvider>
        <BrowserRouter>
          <RouteChange />
        </BrowserRouter>
      </main>
    );
  }
}

//export default withRouter(App);
export default App;
