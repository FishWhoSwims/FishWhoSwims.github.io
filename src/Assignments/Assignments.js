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

class Assignments extends Component {
  constructor(){
    super();
    this.state = {
      assignments: assignmentList,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    };
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  }

  handleChange(event) {
    this.setState({height: event.target.value});
  }

  render(){
    let redirect = requireUsername();
    if (redirect) {
      return redirect;
    }

    const tableRows = this.state.assignments.map((row, index) => (
      <TableRow key={index}>
        <TableRowColumn>{row.assignName}</TableRowColumn>
        <TableRowColumn>{row.createDate}</TableRowColumn>
        <TableRowColumn>{row.dueDate}</TableRowColumn>
        <TableRowColumn>{row.ptWorth}</TableRowColumn>
        <TableRowColumn>{row.finished}</TableRowColumn>
      </TableRow>
    ));

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
                <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
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
              {tableRows}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Assignments;
