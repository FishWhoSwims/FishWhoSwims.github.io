import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  buttonStyle: {
    marginBottom: 12,
    marginTop: 12
  }
};

class CourseForm extends Component{

  constructor(){
    super();
    this.state = {
      name: '',
      number: '',
      instructor: ''
    }
    this.getCourseName = this.getCourseName.bind(this)
    this.getCourseNumber = this.getCourseNumber.bind(this)
    this.getCourseInstrutor = this.getCourseInstrutor.bind(this)
  }

  getCourseName(input) {
    this.setState({
      name: input
    });
  }

  getCourseNumber(input) {
    this.setState({
      number: input
    });
  }

  getCourseInstrutor(input) {
    this.setState({
      instructor: input
    });
  }

  submit(){

  }

  render() {
    return (
       <div>
       <label>Add a new course</label>
        <form id="myForm">
          <TextField
            floatingLabelText="What is your course name?"
            floatingLabelFixed={true}
            onChange={() => this.getCourseName()}
            value={this.state.name}
          /><br />
          <TextField
            floatingLabelText="What is your course number?"
            floatingLabelFixed={true}
            onChange={() => this.getCourseNumber()}
            value={this.state.number}
          /><br />
          <TextField
            floatingLabelText="Who is your instructor?"
            floatingLabelFixed={true}
            onChange={() => this.getCourseInstrutor()}
            value={this.state.instructor}
          /><br />
        </form>
        <RaisedButton label="Add" primary={true} style={styles.buttonStyle}
            onClick={()=>this.submit()}/>
      </div>
    )
  };
}

  export default CourseForm;
