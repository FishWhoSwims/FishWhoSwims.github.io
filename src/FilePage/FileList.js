import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FilePage from './FilePage.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan500, deepPurple600, teal800, indigo500, lightBlue800} from 'material-ui/styles/colors';

const DummyFiles = [
  {
    assignmentName: '3308',
    dueDate: 'EMIS',
    grade: 'Goodman',
    color: cyan500,
    courseId: '1'
  },
  {
    assignmentName: '1341',
    dueDate: 'CSE',
    grade: 'Walker',
    color: deepPurple600,
    courseId: '1'
  }
];

let fileNumber = 0;
class FileList extends Component {

  constructor () {
    super();
    this.state = {
      files: DummyFiles,
    };
  }

  render() {
    const FileRows = this.state.files.map((file) => {
      return (
        <FilePage
          {...file}
          key={fileNumber++}/>
      );
    });

    return (
      <div>
          <MuiThemeProvider>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>File Name</TableHeaderColumn>
                <TableHeaderColumn>Due Date</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FileRows}
            </TableBody>
            </Table>
          </MuiThemeProvider>
      </div>
    );
  }
}


export default FileList;
