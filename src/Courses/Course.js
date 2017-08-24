import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';

const courseStyle = {
  cursor: 'pointer'
};

class Course extends Component {
  constructor() {
    super();
    // Fetch assignments
    this.assignments = [
      'Dummy Assignment 1',
      'Dummy Assignment 2'
    ];
  }

  openModal() {
    // Really we should be display a modal
    alert(this.assignments);
  }

  render() {
    return (
      <GridTile
        key={this.props.name}
        title={this.props.name}
        style={courseStyle}
        onClick={this.openModal.bind(this)}
      >
        <img src={this.props.icon} alt='Course'/>
      </GridTile>
    );
  }
}

export default Course;
