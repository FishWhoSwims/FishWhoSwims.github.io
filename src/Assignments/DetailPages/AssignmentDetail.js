import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Redirect} from 'react-router';

const cardInfo = {
  courseMaterialID: 5,
  type: "assignment",
  name: "Assembly Lab Quiz",
  date: "2017-09-18",
  assocExamID: 1,
  courseID: 1
};




class DetailPage extends Component{
  constructor(){
    super();
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.targetUrl = 'http://52.35.1.78/API';
    this.state = {
      assignmentInfo: cardInfo,
      redirect: null,
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
                  <ListItem primaryText={"DATE: " + this.state.assignmentInfo.date}/>
                </List>
                <CardActions>
                  <RaisedButton label="EDIT" backgroundColor='#00BCD4'/>
                  <RaisedButton onClick={this.openModal.bind(this)} label="CANCEL" backgroundColor='#FF5722'/>
                </CardActions>
              </Card>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default DetailPage;
