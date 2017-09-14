import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const styles = {
    buttonStyle: {
        marginBottom: 12,
        marginTop: 12
    }
};
const background = {
    indigo: '#5C6BC0',
    cyan: '#00ACC1',
    green: '#43A047',
    deepOrange: '#F4511E'
}

class AssignmentForm extends Component {

    constructor(props) {
        super(props);
        this.targetUrl = 'http://52.35.1.78/API';
        this.state = {
            name: '',
            date: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, name) {
        this.setState({ [name]: e.target.value });
    }

    submit() {
        var formData = {
            name: this.state.name,
            date: this.state.date,
            userID: this.props.userID,
            courseID: this.props.courseID,
            targetUrl: this.props.targetUrl,
        }
        
        this.props.sendData(formData);
        this.props.closeFormModal();
    }

    setDate(x, event) {
        var dd = (event.getDate() < 10 ? '0' : '') + event.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((event.getMonth() + 1) < 10 ? '0' : '') + (event.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = event.getFullYear();
        var date = (yyyy + "-" + MM + "-" + dd);
        this.setState({ date: date });
    }

    
    render() {
        return (
            <div>
                <label>Add a new assignment</label>
                <form id="myForm">
                    <TextField
                        floatingLabelText="What is your assignment name?"
                        floatingLabelFixed={true}
                        onChange={(e) => this.handleChange(e, 'name')}
                        value={this.state.name}
                    />
                    <DatePicker 
                        floatingLabelText="When is your assignment due?"
                        floatingLabelFixed={true}
                        hintText="Due Date" 
                        onChange={(x, event) => this.setDate(x, event)} 
                        defaultDate={new Date()}
                    /><br /><br />
                    {/* <TextField
                        floatingLabelText="What is your assignment due?"
                        floatingLabelFixed={true}
                        onChange={(e) => this.handleChange(e, 'number')}
                        value={this.state.date}
                    /><br /><br /> */}

                </form>
                <RaisedButton label="Add" primary={true} style={styles.buttonStyle}
                    onClick={() => this.submit()} />
            </div>
        )
    };
}

export default AssignmentForm;
