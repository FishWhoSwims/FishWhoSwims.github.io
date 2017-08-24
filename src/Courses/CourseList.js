import React, {Component} from 'react'
import {GridList} from 'material-ui/GridList'
import Course from './Course.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const DummyCourses = ['EMIS 3301', 'KNW 1333', 'CSE 3921', 'MATH 2222']

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    padding: 5,
    width: 500,
    overflowY: 'auto'
  }
}

let courseNumber = 0
class CourseList extends Component {

  constructor () {
    super()
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
    })

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
    )
  }
}


export default CourseList
