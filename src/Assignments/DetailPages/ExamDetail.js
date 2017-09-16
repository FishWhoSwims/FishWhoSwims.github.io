import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from 'react-router';
import Assignment from '../Assignment.js';

const tableInfo =   {
  examID: 1,
  name: "Test 1: ARM Basics",
  date: "2017-09-21",
  courseID: 1,
  assignments: [
    {
      courseMaterialID: 4,
      type: "assignment",
      name: "Assembly Homework #1",
      date: "2017-09-15",
      assocExamID: 1,
      courseID: 1
    },
    {
      courseMaterialID: 5,
      type: "assignment",
      name: "Assembly Lab Quiz",
      date: "2017-09-18",
      assocExamID: 1,
      courseID: 1
    }
  ],
  notes: [
    {
      courseMaterialID: 6,
      type: "note",
      name: "ARM In-Class Notes",
      date: "2017-09-18",
      assocExamID: 1,
      courseID: 1
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

    let paperStyle = {
      'width' : '75%',
      'marginLeft': '280px',
      'marginBottom' : '20px'
    };

    let paperTitle = {
      'marginLeft': '15px',
      'paddingTop': '15px',
      'marginBottom' : '-5px'
    };
    let forceDown = { 'marginTop': '64px' };

    if (this.state.redirect != null) {
      return (<Redirect to={this.state.redirect}/>);
    }
    return (
      (<div>
        <MuiThemeProvider>
          <Card style={forceDown}>
            <CardMedia
              overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
            </CardMedia>
            <CardTitle title={this.state.examTable.name} subtitle={"Exam Date: " + this.state.examTable.date} />
            <Paper style={paperStyle}>
              <h2 style={paperTitle}>Assignments</h2>
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
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>Due Date</TableHeaderColumn>
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
                      <TableRowColumn>{row.name}</TableRowColumn>
                      <TableRowColumn>{row.date}</TableRowColumn>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
            <Paper style={paperStyle}>
              <h2 style={paperTitle}>Notes</h2>
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
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>Create Date</TableHeaderColumn>
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
                      <TableRowColumn>{row.name}</TableRowColumn>
                      <TableRowColumn>{row.date}</TableRowColumn>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
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
