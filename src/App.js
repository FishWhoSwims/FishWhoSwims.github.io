import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Course from './Course/Course.js'

const DummyCourses = ['EMIS 3301', 'KNW Sucks']

const ClassList = DummyCourses.map((course) => {
  return (
    <MuiThemeProvider>
      <Course name={course}/>
    </MuiThemeProvider>

  )
})

class App extends Component {
  render() {
    return   (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Swimming Fish" />
        </MuiThemeProvider>
        {ClassList}
      </div>
    )
  }
}

export default App
