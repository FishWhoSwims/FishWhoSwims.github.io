import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    buttonStyle: {
        marginBottom: 12,
        marginTop: 12
    },
    dropStyle: {
        width: '100%',
        paddingLeft: '-15px',
        paddingRight: '15px',
    }
};

class AssignmentForm extends Component {

    constructor(props) {
        super(props);
        console.log("Exams", this.props.parentState.exams[0].props.data.name);
        const items = [];
        items.push(<MenuItem value={0} key={'null'} primaryText={`-------`} />);
        for (let i = 1; i <= this.props.parentState.exams.length; i++) {
            items.push(<MenuItem value={i} key={this.props.parentState.exams[i - 1].props.data.examID} primaryText={this.props.parentState.exams[i-1].props.data.name} />);
        }
        console.log("Menu", items);

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
            value: 0,
            assocExamID : 'null',
            menu: items,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDropChange = this.handleDropChange.bind(this);
    }

    handleChange(e, name) {
        this.setState({ [name]: e.target.value });
    }

    handleDropChange = (event, index, value) => {

        this.setState({ 
            value,
            assocExamID: this.state.menu[value].key,
         });

    }

    submit() {
        var formData = {
            name: this.state.name,
            date: this.state.date,
            userID: this.props.parentState.userID,
            courseID: this.props.parentState.courseID,
            targetUrl: this.props.targetUrl,
            assocExamID : this.state.assocExamID,
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
                    />
                    <SelectField 
                        floatingLabelText="Associated Exam"
                        floatingLabelFixed={true}
                        value={this.state.value} 
                        onChange={this.handleDropChange}>
                        {this.state.menu}
                    </SelectField>
                    <br /><br />

                </form>
                <RaisedButton label="Add" primary={true} style={styles.buttonStyle}
                    onClick={() => this.submit()} />
            </div>
        )
    };
}

export default AssignmentForm;
