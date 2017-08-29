import React, {Component} from 'react';
import {GridList} from 'material-ui/GridList';
import Course from './Course.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import requireUsername from '../util/requireUsername.js';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    padding: 5,
    width: 500,
    height: 'auto',
    overflowY: 'auto'
  }
};

let courseNumber = 0;
class CourseList extends Component {

  constructor () {
    super();
    this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.targetUrl = 'http://52.35.1.78/API';
    this.state = {
      courses: [],
    };
    fetch(this.proxyUrl + this.targetUrl + '/users/1/classes/')
      .then(response => response.json())
      .then(response => this.setState({courses: response}));
  }

  render() {
    let redirect = requireUsername();
    if (redirect) {
      return redirect;
    }

    const ClassCells = this.state.courses.map((course) => {
      return (
        <Course
          {...course}
          key={courseNumber++}/>
      );
    });

    return (
      <div>
        <div style={styles.root}>
          <MuiThemeProvider>
            <GridList
              cellHeight={300}
              style={styles.gridList}
            >
              {ClassCells}
            </GridList>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}


export default CourseList;
