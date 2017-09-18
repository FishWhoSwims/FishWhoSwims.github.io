import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

const styles = {
    buttonStyle: {
        marginBottom: 12,
        marginTop: 12
    }
};

class ExamForm extends Component {

    constructor(props) {
        super(props);

        //Default date
        var temp = new Date();
        var dd = (temp.getDate() < 10 ? '0' : '') + temp.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((temp.getMonth() + 1) < 10 ? '0' : '') + (temp.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = temp.getFullYear();
        var date = (yyyy + "-" + MM + "-" + dd);


        this.state = {
            name: '',
            date: date,
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
            userID: this.props.parentState.userID,
            courseID: this.props.parentState.courseID,
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
        // console.log("event",JSON.stringify(event));
        this.setState({ date: date });
    }


    render() {
        return (
            <div>
                <label>Add a new exam</label>
                <form id="myForm">
                    <TextField
                        floatingLabelText="What is your exam name?"
                        floatingLabelFixed={true}
                        onChange={(e) => this.handleChange(e, 'name')}
                        value={this.state.name}
                    />
                    <DatePicker
                        floatingLabelText="When is the date of this exam?"
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

export default ExamForm;
