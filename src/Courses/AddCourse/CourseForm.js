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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, name){
    this.setState({ [name]: e.target.value });
  }

  submit(){
    var formData = {
      courseName: this.state.name,
      courseNumber: this.state.number,
      instructor: this.state.instructor
    }
    this.props.sendData(formData);
    this.props.closeFormModal();
  }

  render() {
    return (
       <div>
       <label>Add a new course</label>
        <form id="myForm">
          <TextField
            floatingLabelText="What is your course name?"
            floatingLabelFixed={true}
            onChange={(e) => this.handleChange(e, 'name')}
            value={this.state.name}
          /><br />
          <TextField
            floatingLabelText="What is your course number?"
            floatingLabelFixed={true}
            onChange={(e) => this.handleChange(e, 'number')}
            value={this.state.number}
          /><br />
          <TextField
            floatingLabelText="Who is your instructor?"
            floatingLabelFixed={true}
            onChange={(e) => this.handleChange(e, 'instructor')}
            value={this.state.instructor}
          /> <br/> <br/>
        </form>
        <RaisedButton label="Add" primary={true} style={styles.buttonStyle}
            onClick={()=>this.submit()}/>
      </div>
    )
  };
}

export default CourseForm;
