import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import Assignments from './Assignments/Assignments.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AppContainer from './AppContainer';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      //isLoggedIn: true,
      currentPath: ''
    };
    // this.props.history.listen((location, action) => {
    //   console.log("on route change");
    // });
  }

  isInLogInPage = () => {
    console.log(this.state.currentPath);
    if(this.state.currentPath === '/'){
      return true;
    } else {
      return false;
    }
  }

  render() {
    this.state.currentPath = window.location.pathname
    return   (
      <main>
        <MuiThemeProvider>
        {
        !this.isInLogInPage()
        ? <AppBar
            onTitleTouchTap={() => {
              window.location = '/';
            }}
            onLeftIconButtonTouchTap={() => {
              window.location = '/assignments';
            }}
            title="Swimming Fish" />
        : null
        }
        </MuiThemeProvider>
          <BrowserRouter>
              <Switch>
                <Route exact path='/' component={SignIn}/>
                <Route path='/courses' component={CourseList}/>
              </Switch>
          </BrowserRouter>
      </main>
    );
  }
}

export default App;
