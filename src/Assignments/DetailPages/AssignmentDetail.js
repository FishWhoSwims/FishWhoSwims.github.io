import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions,  CardMedia, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
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
      materialID: getMaterialID(),
      fileURLs: [],
      courseName: "",
      instructor: "",
      assignmentInfo: {
        courseMaterialID: 0,
        type: "",
        name: "",
        date: "",
        files: [],
        assocExamID: 0,
        courseID: 0
      },
      redirect: null,
    };
    // this.getFiles = this.getFiles.bind(this);
  }


  openModal() {
    this.setState({redirect: '/assignments'});
  }


  componentWillMount(){
    fetch(targetUrl + '/users/' + this.state.userID + '/classes/' + this.state.classID)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        }
  
        // Examine the text in the response  
        response.json().then((data) => {
          this.setState({
            courseName: data.courseName +" "+ data.courseNumber,
            instructor: data.instructor
          });
          console.log(data);
        });
      }  
    );

    fetch(targetUrl + '/users/' + this.state.userID + '/classes/' + this.state.classID + '/assignments/' + this.state.materialID)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        }
  
        // Examine the text in the response  
        response.json().then((data) => {
          this.setState({
            assignmentInfo: data
          });
          console.log(data);
        });
      }  
    )  
    .catch((err) => {  
      console.log('Fetch Error :-S', err);  
    });
  }



  render(){

    let paperStyle = {
      'width' : '75%',
      'marginTop': '70px',
      'marginLeft': '280px',
      'marginBottom' : '20px'
    };

    let paperFileStyle = {
      'width' : '20%',
      'marginTop': '10px',
      'marginLeft': '1030px',
      'marginBottom' : '20px'
    };


    if (this.state.redirect != null) {
      return (<Redirect to={this.state.redirect}/>);
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Paper style={paperStyle}>
              <Card>
                <CardMedia
                  overlay={<CardTitle title={this.state.courseName} subtitle={this.state.instructor} />}
                >
                <img src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAA1SAAAAJGFmZGM2NWY2LWM2ZjYtNDZhNy05OGM0LWU3NTExMjY1NDlkMw.jpg"/>
                </CardMedia>
                <CardTitle title={this.state.assignmentInfo.name} subtitle={this.state.assignmentInfo.type} />

                <List>
                  <ListItem primaryText={"DUE DATE: " + this.state.assignmentInfo.date}/>
                  {
                    this.state.assignmentInfo.files.map( (row, index) => (
                      <ListItem key={index}><a key={index} href= {targetUrl + row.location.substring(4)}
                      download={row.filename}>
                        {"Download "+row.filename}
                      </a></ListItem>
                    ))
                  }
                </List>

                <CardActions>
                  {/* <RaisedButton label="EDIT" backgroundColor='#00BCD4'/> */}
                  <RaisedButton onClick={this.openModal.bind(this)} label="BACK" backgroundColor='#FF5722'/>
                  
                </CardActions>
              </Card>
            </Paper>
            <Paper style={paperFileStyle}>
              <form action="/upload/file" method="post">
                <input id="file" type="file" />
              </form>
              <RaisedButton label="UPLOAD" backgroundColor='#00BCD4'/>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default DetailPage;
