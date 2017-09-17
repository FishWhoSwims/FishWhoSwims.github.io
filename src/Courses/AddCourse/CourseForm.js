import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  buttonStyle: {
    marginBottom: 12,
    marginTop: 12
  }
};

const background = {
  indigo:'#5C6BC0',
  cyan: '#00ACC1',
  green: '#43A047',
  deepOrange:'#F4511E'
}

class CourseForm extends Component{

  constructor(){
    super();
    this.state = {
      name: '',
      number: '',
      instructor: '',
      color: 'red'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, name){
    this.setState({ [name]: e.target.value });
  }

  changeColor = (event, index, value) => {
      this.setState({
          color: value
      })
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

        <label>Pick a color</label><br />
        <DropDownMenu value={this.state.color} onChange={this.changeColor}>
          <MenuItem key={1} value={"5C6BC0"} style={{backgroundColor: background.indigo}} primaryText="Indigo"/>
          <MenuItem key={2} value={"00ACC1"} style={{backgroundColor: background.cyan}} primaryText="Cyan"/>
          <MenuItem key={3} value={"43A047"} style={{backgroundColor: background.green}} primaryText="Green"/>
          <MenuItem key={4} value={"F4511E"} style={{backgroundColor: background.deepOrange}} primaryText="Deep Orange"/>
        </DropDownMenu>

        </form>
        <RaisedButton label="Add" primary={true} style={styles.buttonStyle}
            onClick={()=>this.submit()}/>
      </div>
    )
  };
}

export default CourseForm;
