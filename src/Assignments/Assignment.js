import React, {Component} from 'react';
import { Redirect } from 'react-router';

import {
  TableRowColumn,
  TableRow,
} from 'material-ui/Table';

class Assignment extends Component{

  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }

  goToSpecifics() {
    this.setState({ redirect: '/detailpage/examdetail' });
  };
  render(){
    if (this.state.redirect != null) {
      return <Redirect to={`${this.state.redirect}`} />;
    }
    const { data, type, ...other } = this.props;
    if(type === 'assignment' || type === 'note'){
      return (
        // <TableBody>
        <TableRow {...other} onRowClick={this.goToSpecifics.bind(this)} >
          {other.children[0] /* checkbox passed down from Table-Body */}
          <TableRowColumn>{data.name}</TableRowColumn>
          <TableRowColumn>{data.date}</TableRowColumn>
          <TableRowColumn>{data.assocExamID ? data.assocExamID : 'Not Assigned'}</TableRowColumn>
        </TableRow>
      );
    }
    else {
      return (
        // <TableBody>
        <TableRow {...other} onRowClick={this.goToSpecifics.bind(this)}>
          {other.children[0] /* checkbox passed down from Table-Body */}
          <TableRowColumn>{data.name}</TableRowColumn>
          <TableRowColumn>{data.date}</TableRowColumn>
          <TableRowColumn>------</TableRowColumn>
        </TableRow>
      );
    }
  }
}

export default Assignment;
