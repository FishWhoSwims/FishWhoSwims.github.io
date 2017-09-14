import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import {Redirect} from 'react-router';

const courseStyle = {
  cursor: 'pointer',
};

class Course extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }

  openModal() {
    this.setState({redirect: '/assignments'});
  }

  render() {
    console.log(this.props);
    if (this.state.redirect != null) {
      // return <Redirect to={`${this.state.redirect}/${this.props.courseID}`}/>;
      return <Redirect to={{
        pathname: '/assignments',
        state: { courseID: this.props.courseID }
      }} />
    }
    let tileStyles = Object.assign({},
      courseStyle,
      {backgroundColor: '#'+this.props.color}
    );
    return (
      <GridTile
        key={this.props.courseID}
        title={this.props.courseName + ' ' + this.props.courseNumber}
        style={tileStyles}
        onClick={this.openModal.bind(this)}
      >
      </GridTile>
    );
  }
}

export default Course;
