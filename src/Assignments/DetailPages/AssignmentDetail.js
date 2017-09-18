import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions,  CardMedia, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Redirect} from 'react-router';
import targetUrl from '../../util/targetUrl.js';
import {getUsername, setUsername} from '../../util/username.js';

const cardInfo = {
  courseMaterialID: 5,
  type: "assignment",
  name: "Assembly Lab Quiz",
  date: "2017-09-18",
  assocExamID: 1,
  courseID: 1
};




class DetailPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      assignmentInfo: cardInfo,
      redirect: null,
    };
  }


  openModal() {
    this.setState({redirect: ''});
  }

  componentWillMount(){
    fetch(targetUrl + '/users/' + getUsername() + '/classes/' + '7' + '/assignments/' + '2')
    .then(  
      function(response) {
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
          return;  
        }
  
        // Examine the text in the response  
        response.json().then(function(data) {  
          console.log(data);  
        });  
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);  
    });
  }



  render(){

    let paperStyle = {
      'width' : '75%',
      'marginTop': '200px',
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
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                </CardMedia>
                <CardTitle title={this.state.assignmentInfo.name} subtitle={this.state.assignmentInfo.type} />

                <List>
                  <ListItem primaryText={"DUE DATE: " + this.state.assignmentInfo.date}/>
                </List>
                <CardActions>
                  <RaisedButton label="EDIT" backgroundColor='#00BCD4'/>
                  <RaisedButton onClick={this.openModal.bind(this)} label="CANCEL" backgroundColor='#FF5722'/>

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
