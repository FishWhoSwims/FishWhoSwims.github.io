import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
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

  constructor() {
    super();
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.targetUrl = 'http://52.35.1.78/API';
    // this.getNotes();
    this.state = {
      assignments: [],
      notes: [],
      exams: [],
      all: [],
      value: 'a',
    };

  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
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
          all: rows
        });
      })
      .then(result => console.log('success:', result))
      .catch(error => console.log('error:', error));
  }

  render() {

    let redirect = requireUsername();
    if (redirect) {
      return redirect;
    }

    // this.getNotes();
    const AllRow = this.state.all.map((assignment) => {
      // console.log('success:', assignment);
      return (
        <Assignment
          type={assignment.props.type} data={assignment.props.data} key={assignmentNumber++} />
      );
    });

    const AssignRow = this.state.assignments.map((assignment) => {
      // console.log('success:', assignment);
      return (
        <Assignment
          type={assignment.props.type} data={assignment.props.data} key={assignmentNumber++} />
      );
    });

    const NoteRow = this.state.notes.map((assignment) => {
      // console.log('success:', assignment);
      return (
        <Assignment
          type={assignment.props.type} data={assignment.props.data} key={assignmentNumber++} />
      );
    });

    const ExamRow = this.state.exams.map((assignment) => {
      // console.log('success:', assignment);
      return (
        <Assignment
          type={assignment.props.type} data={assignment.props.data} key={assignmentNumber++} />
      );
    });

    return (
      <div>
        <MuiThemeProvider>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="All" value="a">
              <div>
                <h2 >All Files</h2>
                <Table
                  height={this.state.height}
                  fixedHeader={this.state.fixedHeader}
                  fixedFooter={this.state.fixedFooter}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}
                >
                  <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                  >
                    {/* <TableRow>
                      <TableHeaderColumn style={{ textAlign: 'center' }}>
                        Assignment Table
                </TableHeaderColumn>
                    </TableRow> */}
                    <TableRow>
                      <TableHeaderColumn>Title</TableHeaderColumn>
                      <TableHeaderColumn>Due Date</TableHeaderColumn>
                      <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                  >
                    {AllRow}
                  </TableBody>
                </Table>
              </div>
            </Tab>
            <Tab label="Exams" value="d">
              <div>
                <h2 >Exams</h2>
                <Table
                  height={this.state.height}
                  fixedHeader={this.state.fixedHeader}
                  fixedFooter={this.state.fixedFooter}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}
                >
                  <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                  >
                    <TableRow>
                      <TableHeaderColumn>Title</TableHeaderColumn>
                      <TableHeaderColumn>Due Date</TableHeaderColumn>
                      <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                  >
                    {ExamRow}
                  </TableBody>
                </Table>
              </div>
            </Tab>
            <Tab label="Assignments" value="b">
              <div>
                <h2 >Assignments</h2>
                <Table
                  height={this.state.height}
                  fixedHeader={this.state.fixedHeader}
                  fixedFooter={this.state.fixedFooter}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}
                >
                  <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                  >

                    <TableRow>
                      <TableHeaderColumn>Title</TableHeaderColumn>
                      <TableHeaderColumn>Due Date</TableHeaderColumn>
                      <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                  >
                    {AssignRow}
                  </TableBody>
                </Table>
              </div>
            </Tab>
            <Tab label="Notes" value="c">
              <div>
                <h2 >Notes</h2>
                <Table
                  height={this.state.height}
                  fixedHeader={this.state.fixedHeader}
                  fixedFooter={this.state.fixedFooter}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}
                >
                  <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                  >

                    <TableRow>
                      <TableHeaderColumn>Title</TableHeaderColumn>
                      <TableHeaderColumn>Due Date</TableHeaderColumn>
                      <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                  >
                    {NoteRow}
                  </TableBody>
                </Table>
              </div>
            </Tab>
          </Tabs>

          {/* <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn colSpan="5" style={{ textAlign: 'center' }}>
                  Assignment Table
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Due Date</TableHeaderColumn>
                <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {AssignRow}
            </TableBody>
          </Table> */}
        </MuiThemeProvider>
      </div>
    );
  }

}

export default Assignments;
