import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import CourseList from './Courses/CourseList.js'

class App extends Component {
  render() {
    return   (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Swimming Fish" />
        </MuiThemeProvider>
        <CourseList/>
      </div>
    )
  }
}

export default App
