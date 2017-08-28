import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {

  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      userName: 'ndang'
    };
  }

  render() {
    return   (
      <main>
        <MuiThemeProvider>
          <AppBar
            onTitleTouchTap={() => {
              window.location = '/courses';
            }}
            onLeftIconButtonTouchTap={() => {
              window.location = '/courses';
            }}
            iconElementRight={<h3>Welcome {this.state.userName} </h3>}
            title="Swimming Fish" />
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
