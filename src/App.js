import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import SignUp from './SignUp/signup.js'
import Assignments from './Assignments/Assignments.js';
import AssignmentDetail from './Assignments/DetailPages/AssignmentDetail.js';
import NoteDetail from './Assignments/DetailPages/NoteDetail.js';
import ExamDetail from './Assignments/DetailPages/ExamDetail.js';
import {getUsername} from './util/username.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import targetUrl from './util/targetUrl.js';
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
    fetch(targetUrl + "/logout/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      window.localStorage.removeItem('username');
      window.location = '/';
    })
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
            iconElementLeft={<img style={{cursor: 'pointer', width:50}} alt='swimming fish' src='img/swimmingfish.jpeg'/>}
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
            <Route path='/signup' component={SignUp} />
            <Route path='/courses' component={CourseList}/>
            <Route path='/assignments/:courseId' component={Assignments}/>
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
