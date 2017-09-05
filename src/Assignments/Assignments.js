import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Assignment from './Assignment.js';
import requireUsername from '../util/requireUsername.js';

let assignmentNumber = 0;
class Assignments extends Component {

  constructor() {
    super();
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.targetUrl = 'http://52.35.1.78/API';
    // this.getNotes();
    this.state = { open: true };
    this.state = {
      assignments: [],
      notes: [],
      exams: [],
      all: [],
      tempRows: [],
      value: 'a',
      tableTitle: 'All Files',
      // courseName: '',
      // courseInstructor: '',
      // courseID: '',
      // courseColor: '',
      // courseNumber: ''
    };

  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
    console.log('value:', value);
  };

  componentWillMount() {
    var userID = 1;
    var classID = 1;
    return fetch(this.proxyUrl + this.targetUrl + '/users/' + userID + '/classes/' + classID)
      .then(results => {
        return results.json();
      }).then(data => {
        console.log('success:', data);
        let assignments = data.assignments.map((assignment) => {
          return (
            <Assignment
              data={assignment} type='assignment' key={assignmentNumber++} />
          )
        })
        let notes = data.notes.map((note) => {
          return (
            <Assignment
              data={note} type='note' key={assignmentNumber++} />
          )
        })
        console.log('notes:', notes);
        let exams = data.exams.map((exam) => {
          return (
            <Assignment
              data={exam} type='exam' key={assignmentNumber++} />
          )
        })

        let row = assignments.concat(notes);
        let rows = row.concat(exams);

        this.setState({
          assignments: assignments,
          notes: notes,
          exams: exams,
          all: rows,
          tempRows: rows,
          courseName: data.courseName,
          courseInstructor: data.instructor,
          courseID: data.courseID,
          courseColor: data.color,
          courseNumber: data.courseNumber
        });
        console.log('course name:', this.state.courseName);
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
    // this.getNotes();
      // console.log('success:', assignment);
    const AllRow = this.state.tempRows.map((assignment) => {
      return (
        <Assignment
          type={assignment.props.type} data={assignment.props.data} key={assignmentNumber++} />
      );
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

    const style = {
      rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
      },
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
              <MenuItem primaryText="Exams" leftIcon={<PersonAdd />} onClick={() => this.handleClick("b")}/>
              <MenuItem primaryText="Assigments" leftIcon={<ContentLink />} onClick={() => this.handleClick("c")}/>
              <MenuItem primaryText="Notes" leftIcon={<ContentCopy />} onClick={() => this.handleClick("d")}/>
            </Drawer>
            <h2 style = {titleStyle}> {title} </h2>
            <Paper style = {paperStyle}>
              <h2 style={paperTitle}>Upcoming</h2>
            <Table
              style= {tableStyle}
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
                {AllRow}
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
