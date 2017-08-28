import React, {Component} from 'react';
import {GridList} from 'material-ui/GridList';
import Course from './Course.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan500, deepPurple600, teal800, indigo500, lightBlue800} from 'material-ui/styles/colors';
import requireUsername from '../util/requireUsername.js';

const DummyCourses = [
  {
    courseNumber: '3308',
    courseName: 'EMIS',
    instructor: 'Goodman',
    color: cyan500,
    courseId: '1'
  },
  {
    courseNumber: '1341',
    courseName: 'CSE',
    instructor: 'Walker',
    color: deepPurple600,
    courseId: '1'
  },
  {
    courseNumber: '2134',
    courseName: 'MATH',
    instructor: 'Best Prof',
    color: teal800,
    courseId: '1'
  },
  {
    courseNumber: '7312',
    courseName: 'CSE',
    instructor: 'Larson',
    color: indigo500,
    courseId: '1'
  },
  {
    courseNumber: '2122',
    courseName: 'CSE',
    instructor: 'Evans',
    color: lightBlue800,
    courseId: '1'
  }
];

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    padding: 5,
    width: 500,
    height: 'auto',
    overflowY: 'auto'
  }
};

let courseNumber = 0;
class CourseList extends Component {

  constructor () {
    super();
    this.state = {
      courses: DummyCourses,
    };
  }

  render() {
    let redirect = requireUsername();
    if(redirect) {
      return redirect;
    }

    const ClassCells = this.state.courses.map((course) => {
      return (
        <Course
          {...course}
          key={courseNumber++}/>
      );
    });

    return (
      <div>
        <div style={styles.root}>
          <MuiThemeProvider>
            <GridList
              cellHeight={300}
              style={styles.gridList}
            >
              {ClassCells}
            </GridList>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}


export default CourseList;
