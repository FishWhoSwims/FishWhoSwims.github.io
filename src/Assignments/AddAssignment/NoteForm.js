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

class NoteForm extends Component {

    constructor(props) {
        super(props);
        this.targetUrl = 'http://52.35.1.78/API';
        this.state = {
            name: '',
            date: '',
        }
        this.handleChange = this.handleChange.bind(this);
        // console.log(this.targetUrl + '/users/'+ this.state.userID + '/classes/'+ this.state.courseID +'/assignments')
    }

    handleChange(e, name) {
        this.setState({ [name]: e.target.value });
    }

    submit() {
        console.log(this.props);
        var formData = {
            assignName: this.state.name,
            dueDate: this.state.date,
            userID: this.props.userID,
            courseID: this.props.courseID,
            targetUrl: this.props.targetUrl,
        }

        // fetch(this.targetUrl + '/users/1/classes/1/assignments', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: 'this.state.name',
        //         date: 'this.state.date',
        //     })
        // })
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
        // console.log("event",JSON.stringify(event));
        this.setState({ date: date });
    }


    render() {
        return (
            <div>
                <label>Add a new note</label>
                <form id="myForm">
                    <TextField
                        floatingLabelText="What is your note name?"
                        floatingLabelFixed={true}
                        onChange={(e) => this.handleChange(e, 'name')}
                        value={this.state.name}
                    />
                    <DatePicker
                        floatingLabelText="When was this note taken?"
                        floatingLabelFixed={true}
                        hintText="Due Date"
                        onChange={(x, event) => this.setDate(x, event)}
                        defaultDate={new Date()}
                    /><br /><br />

                </form>
                <RaisedButton label="Add" primary={true} style={styles.buttonStyle}
                    onClick={() => this.submit()} />
            </div>
        )
    };
}

export default NoteForm;
