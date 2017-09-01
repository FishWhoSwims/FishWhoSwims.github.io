import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import Assignments from './Assignments/Assignments.js';
import DetailPage from './Assignments/DetailPage.js';
import {getUsername} from './util/username.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const styles = {
  root: {
    backgroundColor: '#E0F2F1'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: getUsername()
    };
  }

  logout() {
    window.localStorage.removeItem('username');
    window.location = '/';
  }

  render() {
    return   (
      <div style={styles.root}>
      <main>
        <MuiThemeProvider>
          <AppBar
            onLeftIconButtonTouchTap={() => {
              window.location = '/courses';
            }}
            onRightIconButtonTouchTap={this.logout.bind(this)}
            iconElementLeft={<img style={{cursor: 'pointer', width:50}} src='img/swimmingfish.jpeg'/>}
            iconElementRight={<p style={{cursor: 'pointer', color: 'white'}}>Logout</p>}
          />
        </MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SignIn}/>
            <Route path='/courses' component={CourseList}/>
            <Route path='/assignments' component={Assignments}/>
            <Route path='/detailpage' component={DetailPage}/>
          </Switch>
        </BrowserRouter>
      </main>
      </div>
    );
  }
}

export default App;
