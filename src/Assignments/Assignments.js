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
      notes: [],
      exams: [],
      all: [],
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
              data={assignment} type='assignment' key={assignmentNumber++}/>
          )
        })
        let notes = data.notes.map((note) => {
          return (
            <Assignment
              data={note} type='note' key={assignmentNumber++}/>
          )
        })
        console.log('notes:', notes);
        let exams = data.exams.map((exam) => {
          return (
            <Assignment
              data={exam} type='exam' key={assignmentNumber++}/>
          )
        })

        // var rows = [];
        // this.state.notes.forEach(function (rowItem, i) {
        //   rows.push(
        //     <tr key={i}>
        //       <td>rent</td>
        //       <td>{rowItem.name}</td>
        //       <td>{rowItem.cost}</td>
        //     </tr>
        //   );
        // });
        let row = assignments.concat(notes);
        let rows = row.concat(exams);

        this.setState({
          assignments : assignments,
          notes : notes,
          exams: exams,
          all : rows
        });
      })
      // .then(result => console.log('success:', result))
      .catch(error => console.log('error:', error));
  }

  // combineRows (){
  //   var rows = [];
  //   this.state.notes.props.data.forEach(function (rowItem, i) {
  //     rows.push(
  //       <tr key={i}>
  //         <td>rent</td>
  //         <td>{rowItem.name}</td>
  //         <td>{rowItem.cost}</td>
  //       </tr>
  //     );
  //   });

    // this.props.packageList.buy.forEach(function (rowItem, i) {
    //   rows.push(
    //     <tr key={i}>
    //       <td>buy</td>
    //       <td>{rowItem.name}</td>
    //       <td>{rowItem.cost}</td>
    //     </tr>
    //   );
    // });
  //   return rows;
  // }

  render() {
    // this.getNotes();
    const AssignRow = this.state.all.map((assignment) => {
      // console.log('success:', assignment);
      return (
        <Assignment
          type = {assignment.props.type} data = {assignment.props.data} key={assignmentNumber++} />
      );
    });
    // const AssignRow = this.combineRows();

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
                {/* <TableHeaderColumn>Create Date</TableHeaderColumn> */}
                <TableHeaderColumn>Due Date</TableHeaderColumn>
                <TableHeaderColumn>Associated Exam ID</TableHeaderColumn>
                {/* <TableHeaderColumn>Points</TableHeaderColumn> */}
                {/* <TableHeaderColumn>Status</TableHeaderColumn> */}
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
