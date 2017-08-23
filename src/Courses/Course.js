import React, {Component} from 'react'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'
import {GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Course extends Component {
  render() {
    return (
      <GridTile
        key={this.props.name}
        title={this.props.name}
      >
        <img src={this.icon}/>
      </GridTile>
    )
  }
}

export default Course
