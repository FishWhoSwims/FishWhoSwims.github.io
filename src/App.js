import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import Assignments from './Assignments/Assignments.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return   (
      <main>
        <MuiThemeProvider>
          <AppBar
            onLeftIconButtonTouchTap={() => {
              window.location = '/courses';
            }}
            iconElementLeft={<img style={{width:50}} src='img/swimmingfish.jpeg'/>}
          />
        </MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SignIn}/>
            <Route path='/courses' component={CourseList}/>
            <Route path='/assignments' component={Assignments}/>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
