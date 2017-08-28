import React, {Component}  from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

var styles = {

}

class FilePage extends Component {

  constructor() {
    super();

  }

  render(){
    const { FileList, ...other } = this.props;
    return (
      // <TableBody>
        <TableRow {...other}>
          {other.children[0] /* checkbox passed down from Table-Body*/}
          <TableRowColumn>{this.props.assignmentName}</TableRowColumn>
          <TableRowColumn>{this.props.dueDate}</TableRowColumn>
          <TableRowColumn>Complete</TableRowColumn>
        </TableRow>
      // </TableBody>
    );
  }
}

FilePage.contextTypes = {
  router: React.PropTypes.object,
};

export default FilePage
