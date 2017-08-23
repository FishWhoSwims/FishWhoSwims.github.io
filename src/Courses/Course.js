import React, {Component} from 'react'
import {GridTile} from 'material-ui/GridList'

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
