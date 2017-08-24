import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {GridList} from 'material-ui/GridList'

import Course from './Course.js'

const DummyCourses = ['EMIS 3301', 'KNW 1333', 'CSE 3921', 'MATH 2222']
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    overflowY: 'auto',
  }
}

let courseNumber = 0

class CourseList extends Component {
  render() {
    const ClassCells = DummyCourses.map((course) => {
      return (
        <Course
          name={course}
          icon="img/swimmingfish.jpeg"
          key={courseNumber++}/>
      )
    })

    return (
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
    )
  }
}


export default CourseList
