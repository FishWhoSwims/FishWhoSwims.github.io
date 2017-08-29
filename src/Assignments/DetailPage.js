import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';


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
    this.state = {
      assignmentInfo: cardInfo,
    };
  }

  

  render(){
    return (
      (<div>
        <MuiThemeProvider>
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
              <RaisedButton label="CANCEL" backgroundColor='#FF5722'/>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>)
    );
  }
}

export default DetailPage;
