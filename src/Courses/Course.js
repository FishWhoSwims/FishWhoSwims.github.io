import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import {Redirect} from 'react-router';
import { getCourseID, setCourseID } from '../util/courseInfo.js';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import DeleteModal from './DeleteCourse/DeleteModal.js';
import {grey50} from 'material-ui/styles/colors';
import {getUsername} from '../util/username.js';
import targetUrl from '../util/targetUrl.js';

const courseStyle = {
  cursor: 'pointer',
};

const modalStyle = {
  'top': '50%',
  'left': '50%',
};
const buttonStyle = {
  'zIndex': 0,
}

class Course extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      showDeleteCourse: false
    };
    this.deleteCourse = this.deleteCourse.bind(this);
    this.closeDeleteModal= this.closeDeleteModal.bind(this);
    this.addDelete = this.addDelete.bind(this);
  }

  openModal() {
    setCourseID(this.props.courseID);
    this.setState({redirect: '/assignments'});
  }

  deleteCourse(wantDelete){
    if(wantDelete){
      fetch(targetUrl + '/users/' + getUsername() + '/classes/' + this.props.courseID + '/', {
        method: "delete",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        console.log("Sucessfully delete a a course");
      });
    }
  }

  addDelete(e) {
    e.stopPropagation();
    this.setState({
      showDeleteCourse: true,
    });
  }

  closeDeleteModal(){
    this.setState({
      showDeleteCourse: false
    });
  }

  render() {
    console.log(this.props);
    if (this.state.redirect != null) {
      // return <Redirect to={`${this.state.redirect}/${this.props.courseID}`}/>;
      return <Redirect to={{
        pathname: '/assignments',
        // state: { courseID: this.props.courseID }
      }} />
    }
    let tileStyles = Object.assign({},
      courseStyle,
      {backgroundColor: '#'+this.props.color}
    );
    return (
      <GridTile
        key={this.props.courseID}
        actionIcon={
          <IconButton onClick={this.addDelete} style={buttonStyle}>
            <DeleteIcon color={grey50}/>{
              this.state.showDeleteCourse
                ? <DeleteModal
                  style={modalStyle}
                  closeFormModal={this.closeDeleteModal}
                  sendData={this.deleteCourse}
                  parentState={this.props} />
                : null
            }
          </IconButton>
        }
        title={this.props.courseName + ' ' + this.props.courseNumber}
        style={tileStyles}
        onClick={this.openModal.bind(this)}
      >
      </GridTile>
    );
  }
}

export default Course;
