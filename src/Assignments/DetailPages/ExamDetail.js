import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from 'react-router';

import targetUrl from '../../util/targetUrl.js';
import {getUsername, setUsername} from '../../util/username.js';
import {getCourseID, setCourseID } from '../../util/courseInfo.js';
import {getMaterialID, setMaterialID} from '../../util/materialInfo.js';


class DetailPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      userID: getUsername(),
      classID: getCourseID(),
      examID: getMaterialID(),
      examTable: {
        examID: 0,
        name: "",
        date: "",
        courseID: 0,
        assignments: [],
        notes: []
      },
      myAssignments: [],
      myNotes: [],
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

  componentWillMount(){
    var newAssign = [];
    var newNote = [];
    fetch(targetUrl + '/users/' + this.state.userID + '/classes/' + this.state.classID + '/exams/' + this.state.examID)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        }
  
        // Examine the text in the response
        response.json().then((data) => {
          newAssign = data.assignments.map( (row, index) => {
            return(
            <TableRow key={index}>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.date}</TableRowColumn>
            </TableRow>
            )
          });
          this.setState({
            examTable: data,
            myAssignments: newAssign
          });

          newNote = data.notes.map( (row, index) => {
            return(
            <TableRow key={index}>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.date}</TableRowColumn>
            </TableRow>
            )
          });
          this.setState({
            examTable: data,
            myAssignments: newAssign,
            myNotes: newNote
          });

          console.log(newAssign);
        });
      }  
    )  
    .catch((err) => {  
      console.log('Fetch Error :-S', err);  
    });
  }

  openAssignmentPage(){
    setMaterialID(14);
    this.setState({ redirect: '/detailpage/assignmentdetail' });
  }

  render(){
    let forceNavDown = { 'top': '64px' };

    let paperStyle = {
      'width' : '75%',
      'marginLeft': '280px',
      'marginBottom' : '20px'
    };

    let cardStyle = {
      'width' : '75%',
      'marginLeft': '280px',
      'marginBottom' : '20px',
      'marginTop': '64px'
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
      <div>
        <MuiThemeProvider>
          <div>
            <Card style={cardStyle}>
              <CardTitle title={this.state.examTable.name} subtitle={"Exam Date: " + this.state.examTable.date} />
              <CardActions>
                {/* <RaisedButton label="EDIT" backgroundColor='#00BCD4'/> */}
                <RaisedButton onClick={this.openModal.bind(this)} label="BACK" backgroundColor='#FF5722'/>
              </CardActions>
            </Card>
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
                  {this.state.myAssignments}
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
                  {this.state.myNotes}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default DetailPage;
