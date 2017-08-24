import React, {Component} from 'react'
import {GridTile} from 'material-ui/GridList'

const courseStyle = {
  cursor: 'pointer'
}

class Course extends Component {
  constructor() {
    super()
  }

  openModal() {
    alert('Show courses here')
  }

  render() {
    return (
      <GridTile
        key={this.props.name}
        title={this.props.name}
        style={courseStyle}
        onClick={this.openModal}
      >
        <img src={this.props.icon} alt='Course'/>
      </GridTile>
    )
  }
}

export default Course
