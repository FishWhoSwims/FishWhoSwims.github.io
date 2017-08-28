import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
/*const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};*/

const assignmentList = [
  {
    assignName: 'Exploring Table Data',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-9-1 23:59',
    ptWorth: 10,
    finished: true,
    pastDue: false
  },
  {
    assignName: 'Exploring Text Data',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-9-8 23:59',
    ptWorth: 10,
    finished: true,
    pastDue: false
  },
  {
    assignName: 'Exploring Image Data',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-9-22 23:59',
    ptWorth: 10,
    finished: false,
    pastDue: false
  },
  {
    assignName: 'Extending Logistic Regression',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-10-6 23:59',
    ptWorth: 10,
    finished: false,
    pastDue: false
  },
  {
    assignName: 'Evaluation and Multi-Layer Perceptron',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-10-20 23:59',
    ptWorth: 10,
    finished: false,
    pastDue: false
  },
  {
    assignName: 'Wide and Deep Networks',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-11-3 23:59',
    ptWorth: 10,
    finished: false,
    pastDue: false
  },
  {
    assignName: 'CNNs',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-11-17 23:59',
    ptWorth: 10,
    finished: false,
    pastDue: false
  },
  {
    assignName: 'RNNs',
    createDate: '2017-8-27 8:00',
    dueDate: '2017-12-1 23:59',
    ptWorth: 10,
    finished: false,
    pastDue: false
  }
];

let assignmentNumber = 0;
class Assignments extends Component {

  constructor() {
    super();
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.targetUrl = 'http://52.35.1.78/API';
    // this.getNotes();
    this.state = {
      assignments: [],
    };
    
  }

  componentWillMount() {
    var userID = 1;
    var classID = 1;
    // Due to CORs issues you have to set up a proxy
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    //   targetUrl = 'http://52.35.1.78/API/users/1/classes/1/notes/1/'
    return fetch(this.proxyUrl + this.targetUrl + '/users/' + userID + '/classes/' + classID)
      .then(results => {
        return results.json();
      }).then(data => {
        console.log('success:', data);
        let assignments = data.assignments.map((assignment) => {
          return (
            <Assignment
              data={assignment}/>
          )
        })
        let notes = data.notes.map((note) => {
          return (
            <Assignment
              data={note} />
          )
        })
        let exams = data.exams.map((exam) => {
          return (
            <Assignment
              data={exam} />
          )
        })
        this.setState({assignments : assignments});
      })
      // .then(result => console.log('success:', result))
      .catch(error => console.log('error:', error));
  }

  render() {
    // this.getNotes();
    const AssignRow = this.state.assignments.map((assignment) => {
      console.log('success:', assignment);
      return (
        <Assignment
          data = {assignment.props.data} key={assignmentNumber++} />
      );
    });

    console.log('success:', AssignRow);
    return (
      <div>
        <MuiThemeProvider>
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
                <TableHeaderColumn colSpan="5" style={{ textAlign: 'center' }}>
                  Assignment Table
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Create Date</TableHeaderColumn>
                <TableHeaderColumn>Due Date</TableHeaderColumn>
                <TableHeaderColumn>Points</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
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
        </MuiThemeProvider>
      </div>
    );
  }

}

export default Assignments;
