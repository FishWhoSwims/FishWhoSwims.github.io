import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import FileList from './FilePage/FileList.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {

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
            title="Swimming Fish" />
        </MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SignIn}/>
            <Route path='/courses' component={CourseList}/>
            <Route path='/files' component={FileList}/>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
