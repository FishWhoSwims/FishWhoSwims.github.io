import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';

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

class StudyGuideForm extends Component {

    constructor(props) {
        super(props);
        const items = [];
        for (let i = 0; i < this.props.parentState.exams.length; i++) {
            items.push(<MenuItem value={i} key={this.props.parentState.exams[i].props.data.examID} primaryText={this.props.parentState.exams[i].props.data.name} />);
        }
        this.state = {
            value: 0,
            menu: items,
            examID: items[0].key
        }
        this.handleDropChange = this.handleDropChange.bind(this);
    }

    handleDropChange = (event, index, value) => {

        this.setState({
            value,
            examID: this.state.menu[value].key,
        });

    }

    submit() {
        var formData = {
            examID: this.state.examID,
        }
        this.props.sendData(formData);
        this.props.closeFormModal();
    }

    render() {
        return (
            <div>
                <form id="myForm">
                    <br />
                    <h3> What exam would you like to create a study guide for?</h3>
                    <SelectField
                        floatingLabelText="Choose Exam"
                        floatingLabelFixed={true}
                        value={this.state.value}
                        onChange={this.handleDropChange}>
                        {this.state.menu}
                    </SelectField>
                </form>
                <RaisedButton label="Create" primary={true} style={styles.buttonStyle}
                    onClick={() => this.submit()} />
            </div>
        )
    };
}

export default StudyGuideForm;
