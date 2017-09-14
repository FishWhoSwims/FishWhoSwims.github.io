import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import NoteForm from './NoteForm';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        // bottom: '-20%',
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
                <NoteForm courseID={this.props.courseID} userID={this.props.userID} targetUrl={this.props.targetUrl} sendData={this.props.sendData} closeFormModal={this.props.closeFormModal} />
            </Modal>
        );
    }
}

export default FormModal;
