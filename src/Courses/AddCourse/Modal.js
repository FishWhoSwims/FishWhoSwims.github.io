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
    bottom: '-20%',
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
          <CourseForm sendData={this.props.sendData} closeFormModal={this.props.closeFormModal}/>
        </Modal>
    );
  }
}

export default FormModal;
