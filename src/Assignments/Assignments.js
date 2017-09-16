import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardTitle, CardText } from 'material-ui/Card';
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
import targetUrl from '../util/targetUrl.js';

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
    // this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // this.getNotes();
    this.state = { open: true };
    this.state = {
      userID: '1',
      courseID: this.props.match.params.courseId,
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

    console.log("testing props",this.props);
    this.closeFormModal = this.closeFormModal.bind(this);
    this.closeNoteModal = this.closeNoteModal.bind(this);
    this.closeExamModal = this.closeExamModal.bind(this);
    this.addAssign = this.addAssign.bind(this);
    this.addNote = this.addNote.bind(this);
    this.addExam = this.addExam.bind(this);

  }

  addAssign() {
    console.log("Reached AddAssign()");
    console.log("userID", this.state.userID);
    this.setState({
      showAssignForm: true,
    });
    this.forceUpdate();
  }

  addNote() {
    console.log("Reached AddAssign()");
    console.log("userID", this.state.userID);
    this.setState({
      showNoteForm: true,
    });
    this.forceUpdate();
  }

  closeNoteModal() {
    this.setState({
      showNoteForm: false
    });
    this.forceUpdate();
  }

  addExam() {
    console.log("Reached AddAssign()");
    console.log("userID", this.state.userID);
    this.setState({
      showExamForm: true,
    });
    this.forceUpdate();
  }

  closeExamModal() {
    this.setState({
      showExamForm: false
    });
    this.forceUpdate();
  }

  closeFormModal() {
    this.setState({
      showAssignForm: false
    });
    this.forceUpdate();
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
    console.log('value:', value);
  };

  getData(data) {
    console.log(data);
    // this.state.assignments.push(data);
    // this.state.all.push(data);

    var formData = {
      name: data.name,
      date: data.date,
    }

    fetch(data.targetUrl + 'users/' + data.userID + '/classes/' + data.courseID + '/assignments', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
       //do something awesome that makes the world a better place
       console.log(response);
    });

  }

  redirectToDetailPage() {

  }

  componentWillMount() {
    var userID = 1;
    var classID = 1;
    var assignments, exams, notes;
    var rows = [];
    var row = [];
    var final = [];
    var now =  new Date();
    console.log("date: ", now);
    // 01, 02, 03, ... 29, 30, 31
    var dd = (now.getDate() < 10 ? '0' : '') + now.getDate();
    // 01, 02, 03, ... 10, 11, 12
    var MM = ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = now.getFullYear();
    var date = (yyyy + "-" + MM + "-" + dd);
    console.log("date: ", date);

    fetch(targetUrl + '/users/' + userID + '/classes/' + this.state.courseID)
      .then(results => {
        return results.json();
      }).then(data => {
        exams = data.exams.map((assignment) => {
          return (
            <Assignment
              data={assignment} type='exam' key={assignmentNumber++} />
          )
        })

        // console.log('success exams:', exams);
        // console.log('success row:', row);

        this.setState({
          exams: exams,
          courseName: data.courseName,
          courseInstructor: data.instructor,
          courseID: data.courseID,
          courseColor: data.color,
          courseNumber: data.courseNumber,
          date: date,
        });
        console.log('course name:', this.state.courseName);
      })
      .then(result => console.log('success:', result))
      .catch(error => console.log('error:', error));

    fetch(targetUrl + '/users/' + userID + '/classes/' + this.state.courseID + '/assignments')
      .then(results => {
        return results.json();
      }).then(data => {
        console.log('success:', data);
        assignments = data.map((assignment) => {
          return (
            <Assignment
              data={assignment} type='assignment' key={assignmentNumber++} />
          )
        })

        // console.log('success row:', row);

        this.setState({
          assignments: assignments
        });
      })
      .then(result => console.log('success:', result))
      .catch(error => console.log('error:', error));

    fetch(targetUrl + '/users/' + userID + '/classes/' + this.state.courseID + '/notes')
      .then(results => {
        return results.json();
      }).then(data => {
        console.log('success:', data);
        notes = data.map((assignment) => {
          return (
            <Assignment
              data={assignment} type='note' key={assignmentNumber++} />
          )
        })

        row = this.state.exams;
        rows = row.concat(this.state.assignments);
        final = rows.concat(notes);

        this.setState({
          notes: notes,
          tempRows: final,
          all: final,
        });
      })
      .then(result => console.log('success:', result))
      .catch(error => console.log('error:', error));

  }

  handleClick = (value) => {
    console.log('value:', value);
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

    // this.getNotes();
      // console.log('success:', assignment);
    const AllRow = this.state.tempRows.map((assignment) => {
      if (assignment.props.data.date >= this.state.date){
        return (
          <Assignment
            type={assignment.props.type} data={assignment.props.data} key={assignmentNumber++} />
        );
      }
    });

    const PastAllRow = this.state.tempRows.map((assignment) => {
      if (assignment.props.data.date < this.state.date) {
        return (
          <Assignment
            type={assignment.props.type} data={assignment.props.data} key={assignmentNumber++} />
        );
      }
    });
    const title = this.state.tableTitle;
    console.log("title: ", title)

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
              <MenuItem primaryText="Assigments" leftIcon={<AssignIcon />} onClick={() => this.handleClick("c")}/>
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
                    targetUrl={targetUrl}
                    sendData={this.getData} />
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
                      targetUrl = {targetUrl}
                      sendData={this.getData} />
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
                    targetUrl={targetUrl}
                    sendData={this.getData} />
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
                  <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
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
                  <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
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
