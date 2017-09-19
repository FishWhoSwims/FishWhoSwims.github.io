import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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

class DeleteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.parentState.data.name,
            courseMaterialID: this.props.parentState.data.courseMaterialID,
        }
    }

    submit() {
        var formData = {
            name: this.state.name,
            courseMaterialID: this.state.courseMaterialID,
        }
        console.log(formData);
        this.props.sendData(formData);
        this.props.closeFormModal();
    }

    render() {
        return (
            <div>
                <form id="myForm">
                    <br/>
                    <h3> Are you sure you want to delete {this.state.name}?</h3>
                </form>
                <RaisedButton label="Delete" primary={true} style={styles.buttonStyle}
                    onClick={() => this.submit()} />
            </div>
        )
    };
}

export default DeleteForm;
