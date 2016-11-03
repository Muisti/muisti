import React, { Component, PropTypes } from 'react';
import { Alert, Button, Modal, Col, Form, FormGroup, FormControl, ControlLabel, FieldGroup } from 'react-bootstrap';
import {addSectionRequest} from '../../SectionActions'

export class SectionCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  handleTitleChange = (e) => {
    this.setState({ formTitle: e.target.value });
  };

  handleContentChange = (e) => {
    this.setState({ formContent: e.target.value });
  };

  handleAddSection = () => {

    addSectionRequest({ moduleCuid: this.props.moduleCuid,
      content: this.state.formContent,
      title: this.state.formTitle,
      orderNumber: this.props.orderNumber }).then(this.close());
  };

  render() {

    return (
      <span>
        <Button onClick={this.open} bsStyle="primary">Lisää uusi</Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title>Uuden sectionin lisäys</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <ControlLabel> Otsikko </ControlLabel>
              <FormControl type="text" value={this.state.formTitle} onChange={this.handleTitleChange} placeholder="Otsikko (valinnainen)" />
              <ControlLabel> Sisältö </ControlLabel>
              <FormControl componentClass="textarea" value={this.state.formContent} onChange={this.handleContentChange} placeholder="Sisältö" />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleAddSection}> Lisää </Button>
            <Button onClick={this.close}>Peruuta</Button>
          </Modal.Footer>

        </Modal>

      </span>
    );

  }
}

SectionCreateModal.propTypes = {
  moduleCuid: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired
};

export default SectionCreateModal;
