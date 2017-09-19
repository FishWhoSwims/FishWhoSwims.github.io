import React from 'react';
import Modal from 'react-modal';
import AssignmentForm from './AssignmentForm';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: '-5%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#E3F2FD'
    }
};
const closeButton = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    minWidth: '50px'
};

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true
        };
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                contentLabel="Example Modal"
                style={styles}
            >
                <FlatButton
                    label="X"
                    primary={true}
                    onClick={this.props.closeFormModal}
                    style={closeButton}
                />
                <AssignmentForm parentState={this.props.parentState} targetUrl = {this.props.targetUrl} sendData={this.props.sendData} closeFormModal={this.props.closeFormModal} />
            </Modal>
        );
    }
}

export default FormModal;
