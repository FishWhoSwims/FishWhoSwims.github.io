import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Redirect} from 'react-router';
import targetUrl from '../../util/targetUrl.js';

const cardInfo = {
  courseMaterialID: 6,
  type: "note",
  name: "ARM In-Class Notes",
  date: "2017-09-18",
  assocExamID: 1,
  courseID: 1
};

class DetailPage extends Component{
  constructor(){
    super();
    this.state = {
      noteInfo: cardInfo,
      redirect: null,
    };
  }

  openModal() {
    this.setState({redirect: ''});
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
              <CardTitle title={this.state.noteInfo.name} subtitle={this.state.noteInfo.type}/>

              <List>
                <ListItem primaryText={"CREATED ON: " + this.state.noteInfo.date}/>
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
