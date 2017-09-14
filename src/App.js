import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import Assignments from './Assignments/Assignments.js';
import AssignmentDetail from './Assignments/DetailPages/AssignmentDetail.js';
import NoteDetail from './Assignments/DetailPages/NoteDetail.js';
import ExamDetail from './Assignments/DetailPages/ExamDetail.js';
import {getUsername} from './util/username.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const styles = {
  navbarStyle : {
    position: 'fixed',
    top:'0px',
    zIndex: '2'
  }
};

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
      <main>
        <MuiThemeProvider>
          <AppBar
            style={styles.navbarStyle}
            onLeftIconButtonTouchTap={() => {
              window.location = '/courses';
            }}
            onRightIconButtonTouchTap={this.logout.bind(this)}
            iconElementLeft={<img style={{cursor: 'pointer', width:50}} src='img/swimmingfish.jpeg'/>}
            iconElementRight=
            {
              this.state.username
              ? <p style={{cursor: 'pointer', color: 'white'}}>Logout</p>
              : null
            }
            />
        </MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SignIn}/>
            <Route path='/courses' component={CourseList}/>
            <Route path='/assignments' component={Assignments}/>
            <Route path='/detailpage/notedetail' component={NoteDetail}/>
            <Route path='/detailpage/assignmentdetail' component={AssignmentDetail}/>
            <Route path='/detailpage/examdetail' component={ExamDetail}/>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
