import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import CourseForm from'./CourseForm';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  content : {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: '-10%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
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
    console.log('here');
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
          <CourseForm />
        </Modal>
    );
  }
}

export default FormModal;
