import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from 'react-router';
import Assignment from '../Assignment.js';


const tableInfo = {
  examID: 1,
  examName: 'Test 1: ARM Basics',
  examDate: '2017-08-28',
  courseID: 1,
  assignments: [
    {
      assignName: 'Exploring Table Data',
      createDate: '2017-8-27 8:00',
      dueDate: '2017-9-1 23:59',
      ptWorth: 10,
      finished: true,
      pastDue: false,
      description: "You are to perform preprocessing and exploratory analysis of a data set: exploring the statistical summaries of the features, visualizing the attributes, and addressing data quality. This report is worth 10% of the final grade. Please upload a report (one per team) with all code used, visualizations, and text in a rendered Jupyter notebook. Any visualizations that cannot be embedded in the notebook, please provide screenshots of the output."
    },
    {
      assignName: 'Exploring Text Data',
      createDate: '2017-8-27 8:00',
      dueDate: '2017-9-8 23:59',
      ptWorth: 10,
      finished: true,
      pastDue: false,
      description: "Second Assignment."
    }
  ],
  notes: [
    {
      noteName: 'Note 1',
      createDate: '2017-8-27 8:00',
      description: 'Notes for lecture 1'
    }
  ]
};

class DetailPage extends Component{
  constructor(){
    super();
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.targetUrl = 'http://52.35.1.78/API';
    this.state = {
      examTable: tableInfo,
      redirect: null,
      fixedHeader: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '200px',
    };
  }


  openModal() {
    this.setState({redirect: '/assignments'});
  }

  render(){
    if (this.state.redirect != null) {
      return <Redirect to={this.state.redirect}/>;
    }
    return (
      (<div>
        <MuiThemeProvider>
          <Card>
            <CardMedia
              overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
            </CardMedia>
            <CardTitle title={this.state.examTable.examName} subtitle={"Exam Date: " + this.state.examTable.examDate} />
            
            <Table
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
                  <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                    Assignments
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Due Date</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {tableInfo.assignments.map( (row, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{row.assignName}</TableRowColumn>
                    <TableRowColumn>{row.dueDate}</TableRowColumn>
                    <TableRowColumn>{row.description}</TableRowColumn>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>

            <Table
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
                  <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                    Notes
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Create Date</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {tableInfo.notes.map( (row, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{row.noteName}</TableRowColumn>
                    <TableRowColumn>{row.createDate}</TableRowColumn>
                    <TableRowColumn>{row.description}</TableRowColumn>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>

            <CardActions>
              <RaisedButton label="EDIT" backgroundColor='#00BCD4'/>
              <RaisedButton onClick={this.openModal.bind(this)} label="CANCEL" backgroundColor='#FF5722'/>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>)
    );
  }
}

export default DetailPage;
