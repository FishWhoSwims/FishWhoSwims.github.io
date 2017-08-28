import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const cardInfo = {    
  assignName: 'Exploring Table Data',
  createDate: '2017-8-27 8:00',
  dueDate: '2017-9-1 23:59',
  ptWorth: 10,
  finished: true,
  pastDue: false
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
            <CardTitle title={this.state.assignmentInfo.assignName} subtitle="Card subtitle" />
            <CardText>
              {"DUE BY " + this.state.assignmentInfo.dueDate}
            </CardText>
            <CardActions>
              <FlatButton label="EDIT" />
              <FlatButton label="RETURN" />
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>)
    );
  }
}

export default DetailPage;
