import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {GridList} from 'material-ui/GridList'

import Course from './Course.js'
import './CourseList.css';

const DummyCourses = ['EMIS 3301', 'KNW 1333', 'CSE 3921', 'MATH 2222']


let courseNumber = 0;
class CourseList extends Component {

  constructor () {
    super();
    this.state = {
      courses: DummyCourses
    }
    // TODO: fetch courses

  }

  render() {
    const ClassCells = this.state.courses.map((course) => {
      return (
        <Course
          name={course}
          icon="img/swimmingfish.jpeg"
          key={courseNumber++}/>
      )
    });

    return (
      <div class='grid-root'>
        <MuiThemeProvider>
          <GridList
            cellHeight={300}
            class='gridList'
          >
            {ClassCells}
          </GridList>
        </MuiThemeProvider>
      </div>
    );
  }
}


export default CourseList
