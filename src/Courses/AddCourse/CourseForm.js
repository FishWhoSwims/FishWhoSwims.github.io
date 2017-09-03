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
      instructor: '', 
      color: 'red'
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
      instructor: this.state.instructor, 
      color: this.state.color
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

            <div>
               <select style={{color: this.state.color}} ref="dropDownColor" 
                        onChange={(e) => this.handleChange(e, 'color')} value={this.state.color}>
                  <option>Pick a color</option>
                  <option value="#5C6BC0" style={{color: '#5C6BC0'}}>Indigo</option>
                  <option value="#00ACC1" style={{color: '#00ACC1'}}>Cyan</option>
                  <option value="#43A047" style={{color: '#43A047'}}>Green</option>
                  <option value="#F4511E" style={{color: '#F4511E'}}>Deep Orange</option>
                </select>
            </div>
        </form>
        <RaisedButton label="Add" primary={true} style={styles.buttonStyle}
            onClick={()=>this.submit()}/>
      </div>
    )
  };
}

  export default CourseForm;
