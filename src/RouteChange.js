import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { withRouter } from 'react-router';

import CourseList from './Courses/CourseList.js';
import SignIn from './SignInPage/SignIn.js';
import Assignments from './Assignments/Assignments.js';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

class RouteChange extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.props.history.listen((location, action) => {
      console.log(location.pathname);
      if(location.pathname === '/'){
        console.log("Is log in page");
      }
    });
  }
  render(){
    return(
        <Switch>
          <Route exact path='/' component={SignIn}/>
          <Route path='/courses' component={CourseList}/>
          <Route path='/assignments' component={Assignments}/>
        </Switch>
    )
  }
}

export default withRouter(RouteChange);
