import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Redirect } from 'react-router';
import AddAssignmentModal from './AddAssignment/Modal';
import AddNoteModal from './AddAssignment/NoteModal';
import AddExamModal from './AddAssignment/ExamModal';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import AssignIcon from 'material-ui/svg-icons/action/assignment';
import ExamIcon from 'material-ui/svg-icons/action/assignment-late';
import SGIcon from 'material-ui/svg-icons/content/add-box';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Assignment from './Assignment.js';
import requireUsername from '../util/requireUsername.js';

let assignmentNumber = 0;
class Assignments extends Component {

  constructor(props) {
    super(props);
    this.targetUrl = 'http://52.35.1.78/API';
    this.state = { open: true };
    this.state = {
      userID: '1',
      courseID: this.props.location.state.courseID,
      assignments: [],
      notes: [],
      exams: [],
      all: [],
      tempRows: [],
      value: 'a',
      tableTitle: 'All Files',
      showAssignForm: false,
      showNoteForm: false,
      showExamForm: false,
    };

    this.closeFormModal = this.closeFormModal.bind(this);
    this.closeNoteModal = this.closeNoteModal.bind(this);
    this.closeExamModal = this.closeExamModal.bind(this);
    this.addAssign = this.addAssign.bind(this);
    this.addNote = this.addNote.bind(this);
    this.addExam = this.addExam.bind(this);
    this.postAssign = this.postAssign.bind(this);

    // Pull data from server

    var userID = 1;
    var assignments = [], exams = [], notes = [], newAssign = [], newNotes = [];
    var final = [];
    var now = new Date();
    // 01, 02, 03, ... 29, 30, 31
    var dd = (now.getDate() < 10 ? '0' : '') + now.getDate();
    // 01, 02, 03, ... 10, 11, 12
    var MM = ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = now.getFullYear();
    var date = (yyyy + "-" + MM + "-" + dd);

    fetch(this.targetUrl + '/users/' + userID + '/classes/' + this.state.courseID)
      .then(results => {
        return results.json();
      }).then(data => {
        exams = data.exams.map((exam) => {
          var eName = exam.name;
          newAssign = exam.assignments.map((assignment) => {
            return (
              <Assignment
                data={assignment} type='assignment' name = {eName} key={assignmentNumber++} />
            )
          })
          // Add assignments to array
          assignments = newAssign.concat(assignments);

          newNotes = exam.notes.map((note) => {
            return (
              <Assignment
                data={note} type='note' name={eName} key={assignmentNumber++} />
            )
          })
          // Add notes to array
          notes = newNotes.concat(notes);
          return (
            <Assignment
              data={exam} type='exam' name='' key={assignmentNumber++} />
          )
        })
        newAssign = data.materialWithoutExam.map((exam) => {
          if(exam.type == "assignment"){
            return (
              <Assignment
                data={exam} type='assignment' name='' key={assignmentNumber++} />
            )
          }
        })

        newAssign = data.materialWithoutExam.filter(function (exam) {
          if (exam.type == "note") {
            return false; // skip
          }
          return true;
        }).map((exam) => { 
          return (
            <Assignment
              data={exam} type='assignment' name='' key={assignmentNumber++} />
          ) 
        });

        newNotes = data.materialWithoutExam.filter(function (exam) {
          if (exam.type == "assignment") {
            return false; // skip
          }
          return true;
        }).map((exam) => {
          return (
            <Assignment
              data={exam} type='note' name='' key={assignmentNumber++} />
          )
        });

        assignments = newAssign.concat(assignments);
        notes = newNotes.concat(notes);

        final = exams.concat(assignments);
        final = final.concat(notes);

        assignments.sort(function (a, b) {
          a = new Date(a.props.data.date);
          b = new Date(b.props.data.date);
          return a < b ? -1 : a > b ? 1 : 0;
        });

        notes.sort(function (a, b) {
          a = new Date(a.props.data.date);
          b = new Date(b.props.data.date);
          return a < b ? -1 : a > b ? 1 : 0;
        });

        exams.sort(function (a, b) {
          a = new Date(a.props.data.date);
          b = new Date(b.props.data.date);
          return a < b ? -1 : a > b ? 1 : 0;
        });

        final.sort(function (a, b) {
          a = new Date(a.props.data.date);
          b = new Date(b.props.data.date);
          return a < b ? -1 : a > b ? 1 : 0;
        });

        this.setState({
          exams: exams,
          courseName: data.courseName,
          courseInstructor: data.instructor,
          courseID: data.courseID,
          courseColor: data.color,
          courseNumber: data.courseNumber,
          date: date,
          notes: notes,
          assignments: assignments,
          all: final,
          tempRows: final,
        });
      })
      .catch(error => console.log('error:', error));

  }

  componentDidMount() {
    
  }

  addAssign() {
    this.setState({
      showAssignForm: true,
    });
  }

  addNote() {
    this.setState({
      showNoteForm: true,
    });
  }

  closeNoteModal() {
    this.setState({
      showNoteForm: false
    });
  }

  addExam() {
    this.setState({
      showExamForm: true,
    });
  }

  closeExamModal() {
    this.setState({
      showExamForm: false
    });
  }

  closeFormModal() {
    this.setState({
      showAssignForm: false
    });
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  postAssign(data) {

    var formData = {
      name: data.name,
      date: data.date,
    }

    fetch(data.targetUrl + '/users/' + data.userID + '/classes/' + data.courseID + '/assignments/', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => { 
       //do something awesome that makes the world a better place
      //  console.log(response.json());
    });

    this.forceUpdate();

  }

  redirectToDetailPage() {
    
  }

  updateAssignmentPost() {
    
  }

  handleClick = (value) => {
    if (value === "a") {
      this.setState({
        value: value,
        tempRows: this.state.all,
        tableTitle: "All Files"
      })
    }
    else if (value === "b") {
      this.setState({
        value: value,
        tempRows: this.state.exams,
        tableTitle: "Exams"
      })
    }
    else if (value === "c") {
      this.setState({
        value: value,
        tempRows: this.state.assignments,
        tableTitle: "Assignments"
      })
    }
    else if (value === "d") {
      this.setState({
        value: value,
        tempRows: this.state.notes,
        tableTitle: "Notes"
      })
    }
  };

  render() {

    let redirect = requireUsername();
    if (redirect) {
      return redirect;
    }

    const AllRow = this.state.tempRows.map((assignment) => {
      if (assignment.props.data.date >= this.state.date){
        return (
          <Assignment
            type={assignment.props.type} name= {assignment.props.name} data={assignment.props.data} key={assignmentNumber++} />
        );
      }
    });

    const PastAllRow = this.state.tempRows.map((assignment) => {
      if (assignment.props.data.date < this.state.date) {
        return (
          <Assignment
            type={assignment.props.type} name={assignment.props.name} data={assignment.props.data} key={assignmentNumber++} />
        );
      }
    });
    const title = this.state.tableTitle;

    let forceNavDown = { 'top': '64px' };

    let tableStyle = { 
      'marginLeft': '30px' ,
      'marginRight': '30px',
      'width' : '95%',
      'position': 'static',
    };
    let titleStyle = {
      'marginLeft': '280px',
    };
    let cardStyle = {
      'background': '#'+this.state.courseColor,
    };
    let paperStyle = {
      'width' : '75%',
      'marginLeft': '280px',
      'marginBottom' : '20px'
    };
    let paperTitle = {
      'marginLeft': '15px',
      'paddingTop': '15px',
      'marginBottom' : '-5px'
    };

    let modalStyle = {
      'top': '50%',
      'left': '50%',
    };

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Drawer 
              value={this.state.value}
              onChange={this.handleChange}
              open={this.state.open} 
              containerStyle={forceNavDown}>
              <Card style= {cardStyle}>
                <CardTitle title={this.state.courseName} subtitle={this.state.courseInstructor} />
                <CardText>
                  Course Number: {this.state.courseNumber}
                </CardText>
              </Card>
              <MenuItem primaryText="All" leftIcon={<RemoveRedEye />} onClick={() => this.handleClick("a")}/>
              <MenuItem primaryText="Exams" leftIcon={<ExamIcon />} onClick={() => this.handleClick("b")}/>
              <MenuItem primaryText="Assignments" leftIcon={<AssignIcon />} onClick={() => this.handleClick("c")}/>
              <MenuItem primaryText="Notes" leftIcon={<ContentCopy />} onClick={() => this.handleClick("d")}/>
              <Divider />
              <MenuItem primaryText="Add Exam" leftIcon={<ExamIcon />} onClick={() => this.addExam()} />
              {
                this.state.showExamForm
                  ? <AddExamModal
                    style={modalStyle}
                    closeFormModal={this.closeExamModal}
                    userID={this.state.userID}
                    courseID={this.state.courseID}
                    targetUrl={this.targetUrl}
                    sendData={this.postAssign} />
                  : null
              }
              <MenuItem primaryText="Add Assignment" leftIcon={<AssignIcon />} onClick={() => this.addAssign()} />
              {
                this.state.showAssignForm
                  ? <AddAssignmentModal 
                      style = {modalStyle} 
                      closeFormModal={this.closeFormModal}
                      userID = {this.state.userID}
                      courseID={this.state.courseID}
                      targetUrl = {this.targetUrl}
                      sendData={this.postAssign} />
                  : null
              }
              <MenuItem primaryText="Add Note" leftIcon={<ContentCopy />} onClick={() => this.addNote()} />
              {
                this.state.showNoteForm
                  ? <AddNoteModal
                    style={modalStyle}
                    closeFormModal={this.closeNoteModal}
                    userID={this.state.userID}
                    courseID={this.state.courseID}
                    targetUrl={this.targetUrl}
                    sendData={this.postAssign} />
                  : null
              }
              <MenuItem primaryText="Create Study Guide" leftIcon={<SGIcon />} onClick={() => this.handleClick("d")} />
            </Drawer>
            <h2 style = {titleStyle}> {title} </h2>
            <Paper style = {paperStyle}>
              <h2 style={paperTitle}>Upcoming</h2>
            <Table
              style= {tableStyle}
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={true}
              multiSelectable={this.state.multiSelectable}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={this.state.enableSelectAll}
              >
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Due Date</TableHeaderColumn>
                  <TableHeaderColumn>Associated Exam</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={true}
                stripedRows={this.state.stripedRows}
              >
                {AllRow}
              </TableBody>
            </Table>
            </Paper>

            <Paper style={paperStyle}>
            <h2 style={paperTitle}>Past</h2>
            <Table
              style={tableStyle}
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={this.state.enableSelectAll}
              >
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Due Date</TableHeaderColumn>
                  <TableHeaderColumn>Associated Exam</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {PastAllRow}
              </TableBody>
            </Table>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default Assignments;
