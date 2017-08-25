import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';

const courseStyle = {
  cursor: 'pointer',
};

class Course extends Component {
  constructor() {
    super();
    // Fetch assignments
    this.assignments = [
      'Dummy Assignment 1',
      'Dummy Assignment 2',
    ];
  }

  openModal() {
    // Really we should be display a modal
    alert(this.assignments);
  }

  render() {
    let tileStyles = Object.assign({},
      courseStyle,
      {backgroundColor: this.props.color}
    );
    return (
      <GridTile
        key={this.props.courseId}
        title={this.props.courseName + ' ' + this.props.courseNumber}
        style={tileStyles}
        onClick={this.openModal.bind(this)}
      >
      </GridTile>
    );
  }
}

export default Course;
