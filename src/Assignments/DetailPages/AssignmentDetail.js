import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Redirect} from 'react-router';

const cardInfo = {
  assignName: 'Exploring Table Data',
  createDate: '2017-8-27 8:00',
  dueDate: '2017-9-1 23:59',
  ptWorth: 10,
  finished: true,
  pastDue: false,
  description: "You are to perform preprocessing and exploratory analysis of a data set: exploring the statistical summaries of the features, visualizing the attributes, and addressing data quality. This report is worth 10% of the final grade. Please upload a report (one per team) with all code used, visualizations, and text in a rendered Jupyter notebook. Any visualizations that cannot be embedded in the notebook, please provide screenshots of the output."
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
                <CardTitle title={this.state.assignmentInfo.assignName} subtitle={this.state.assignmentInfo.ptWorth+" points"} />

                <List>
                  <ListItem primaryText={"CREATED ON: " + this.state.assignmentInfo.createDate}/>
                  <ListItem primaryText={"DUE BY: " + this.state.assignmentInfo.dueDate}/>
                  <ListItem primaryText={"Description: " + this.state.assignmentInfo.description}/>
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
