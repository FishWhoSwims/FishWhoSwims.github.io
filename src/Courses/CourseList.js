import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {GridList} from 'material-ui/GridList';

import Course from './Course.js'

const DummyCourses = ['EMIS 3301', 'KNW 1333', 'CSE 3921', 'MATH 2222']

class CourseList extends Component {

  render() {
    const ClassCells = DummyCourses.map((course) => {
      return (
          <Course name={course} icon="img/swimmingfish.jpeg"/>
      )
    });
    return (
      <MuiThemeProvider>
        <GridList
          cellHeight={180}
        >
          {ClassCells}
        </GridList>
      </MuiThemeProvider>

    );
  }
}


export default CourseList;
