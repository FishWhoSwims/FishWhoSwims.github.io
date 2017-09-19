import React, {Component} from 'react';
import { Redirect } from 'react-router';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { getMaterialID, setMaterialID } from '../util/materialInfo.js';
import DeleteModal from './DeleteModal';
import { getUsername, setUsername } from '../util/username.js';
import { getCourseID, setCourseID } from '../util/courseInfo.js';
import targetUrl from '../util/targetUrl.js';

import {
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';

let modalStyle = {
  'top': '50%',
  'left': '50%',
};

class Assignment extends Component{

  constructor() {
    super();
    this.state = {
      redirect: null,
      showDeleteForm: false,
      userID : getUsername(),
      courseID : getCourseID()
    };

    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.addDelete = this.addDelete.bind(this);
    this.deleteMaterial = this.deleteMaterial.bind(this);
  }

  goToSpecifics() {
      if(this.props.type === 'assignment'){
        this.setState({ redirect: '/detailpage/assignmentdetail' });
        setMaterialID(this.props.data.courseMaterialID);
      }
      else if (this.props.type === 'note'){
        this.setState({ redirect: '/detailpage/notedetail' });
        setMaterialID(this.props.data.courseMaterialID);
      }
      else if (this.props.type === 'exam') {
        this.setState({ redirect: '/detailpage/examdetail' });
        setMaterialID(this.props.data.examID);
      }
  };


  deleteMaterial(data){
    if (this.props.type === 'assignment') {
      fetch(targetUrl + '/users/' + this.state.userID + '/classes/' + this.state.courseID + '/assignments/' + this.props.data.courseMaterialID + '/', {
        method: "delete",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => {

      });
    }
    else if (this.props.type === 'note') {
      fetch(targetUrl + '/users/' + this.state.userID + '/classes/' + this.state.courseID + '/notes/' + this.props.data.courseMaterialID + '/', {
        method: "delete",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => {

      });
    }
    this.props.updateState(data);
  }

  addDelete(e) {
    e.stopPropagation();
    this.setState({
      showDeleteForm: true,
    });
  }

  closeDeleteModal() {
    this.setState({
      showDeleteForm: false
    });
  }

  render(){
    if (this.state.redirect != null) {
      return <Redirect to={`${this.state.redirect}`} />;
    }
    const { data, type, name, updateState, ...other } = this.props;
    if(type === 'assignment' || type === 'note'){
      return (
        // <TableBody>
        <TableRow {...other} onRowClick={this.goToSpecifics.bind(this)} >
          {other.children[0] /* checkbox passed down from Table-Body */}
          <TableRowColumn>{data.name}</TableRowColumn>
          <TableRowColumn>{data.date}</TableRowColumn>
          <TableRowColumn>{name ? name : 'Not Assigned'}</TableRowColumn>
          <TableRowColumn>
            <IconButton onClick={this.addDelete}>
              <DeleteIcon />{
                this.state.showDeleteForm
                  ? <DeleteModal
                    style={modalStyle}
                    closeFormModal={this.closeDeleteModal}
                    sendData={this.deleteMaterial}
                    parentState={this.props} />
                  : null
              }
            </IconButton>
          </TableRowColumn>
        </TableRow>
      );
    }
    else {
      return (
        // <TableBody>
        <TableRow {...other} onRowClick={this.goToSpecifics.bind(this)}>
          {other.children[0] /* checkbox passed down from Table-Body */}
          <TableRowColumn>{data.name}</TableRowColumn>
          <TableRowColumn>{data.date}</TableRowColumn>
          <TableRowColumn>------</TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
      );
    }
  }
}

export default Assignment;
