import React, {Component} from 'react';
import {
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';

class Assignment extends Component{

  render(){
    const { data, type, ...other } = this.props;
    if(type === 'assignment' || type === 'note'){
      return (
        // <TableBody>
        <TableRow {...other}>
          {other.children[0] /* checkbox passed down from Table-Body */}
          <TableRowColumn>{data.name}</TableRowColumn>
          <TableRowColumn>{data.date}</TableRowColumn>
          <TableRowColumn>{data.assocExamID ? data.assocExamID : 'Not Assigned'}</TableRowColumn>
          {/* <TableRowColumn><div>{data.ptWorth}</div></TableRowColumn> */}
          {/* <TableRowColumn><div>{data.finished}</div></TableRowColumn> */}
        </TableRow>
        // </TableBody>
      );
    }
    else {
      return (
        // <TableBody>
        <TableRow {...other}>
          {other.children[0] /* checkbox passed down from Table-Body */}
          <TableRowColumn>{data.name}</TableRowColumn>
          <TableRowColumn>{data.date}</TableRowColumn>
          <TableRowColumn>------</TableRowColumn>
          {/* <TableRowColumn><div>{data.ptWorth}</div></TableRowColumn> */}
          {/* <TableRowColumn><div>{data.finished}</div></TableRowColumn> */}
        </TableRow>
        // </TableBody>
      );
    }
  }
}

export default Assignment;
