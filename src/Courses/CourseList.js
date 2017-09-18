import React, {Component} from 'react';
import {GridList} from 'material-ui/GridList';
import Course from './Course.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {getUsername, setUsername} from '../util/username.js';
import requireUsername from '../util/requireUsername.js';
import AddCourseModal from './AddCourse/Modal';
import targetUrl from '../util/targetUrl.js';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    position: 'relative'
  },
  gridList: {
    marginTop: '75px',
    padding: 5,
    width: 800,
    height: 'auto',
    overflowY: 'auto'
  },
  buttonStyle: {
    position: 'absolute',
    left: '45%',
    zIndex: -1,
    marginBottom: 15,
    marginTop: 15
  }
};

let courseNumber = 0;
class CourseList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      courses: [],
      classCells: [],
      showCourseForm: false
    };
    this.closeFormModal = this.closeFormModal.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.getData = this.getData.bind(this);

    fetch(targetUrl + '/users/'+ getUsername() +'/classes/')
      .then(response => response.json())
      .then(response => this.setState({courses: response}));
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  addCourse(){
    this.setState({
      showCourseForm: true
    });
    this.forceUpdate();
  }

  closeFormModal(){
    this.setState({
      showCourseForm: false
    });
    this.forceUpdate();
  }

  getData(data){
    //this.state.courses.push(data);

    fetch(targetUrl + '/users/'+ getUsername() +'/classes/', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
       //do something awesome that makes the world a better place
       console.log(response);
    });

    this.forceUpdate();
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
              cols={3}
              padding={5}
            >
              {ClassCells}
            </GridList>
          </MuiThemeProvider>
        </div>
        <RaisedButton label="Add Course" primary={true} style={styles.buttonStyle}
            onClick={()=>this.addCourse()}/>
        {
          this.state.showCourseForm
          ? <AddCourseModal closeFormModal={this.closeFormModal} sendData={this.getData}/>
          : null
        }
      </div>
    );
  }
}

CourseList.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default CourseList;
