import React, {Component} from 'react';
import {
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';

class Assignment extends Component{
  constructor(){
    super();
    // this.state = {
    //   assignmentName: ''
    // };
  }

  render(){
    const { data, ...other } = this.props;
    return (
      // <TableBody>
      <TableRow {...other}>
        {other.children[0] /* checkbox passed down from Table-Body */}
        <TableRowColumn><div>{data.assignName}</div></TableRowColumn>
        <TableRowColumn><div>{data.createDate}</div></TableRowColumn>
        <TableRowColumn><div>{data.dueDate}</div></TableRowColumn>
        <TableRowColumn><div>{data.ptWorth}</div></TableRowColumn>
        <TableRowColumn><div>{data.finished}</div></TableRowColumn>
      </TableRow>
      // </TableBody>
    );
  }
}

export default Assignment;
