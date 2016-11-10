import React, { Component, PropTypes } from 'react';
import { Alert, Button, Modal, Col, Form, FormGroup, FormControl, ControlLabel, FieldGroup } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { addSectionRequest } from '../../SectionActions'
import validator from 'validator'
export class SectionCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  clearFields = () => {
    this.state = {formTitle: "", formContent: "", formLink: "" };
  };

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

  handleLinkChange = (e) =>{
    this.setState({ formLink: e.target.value })  
  }

  handleAddSection = () => {
    if (!this.state.formContent && !this.state.formLink) return;

    addSectionRequest({
      moduleCuid: this.props.moduleCuid,
      content: this.state.formContent,
      title: this.state.formTitle,
      link: this.state.formLink,
      orderNumber: this.props.orderNumber })
      .then(this.props.addSectionToRender);
    
    this.clearFields();
    //this.close();
    
  };

  render() {

    return (
      <span>
          <Button onClick={this.open} bsStyle="primary"><FormattedMessage id="addSection"/></Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="addingSection"/></Modal.Title>
          </Modal.Header>
          <form>
          <Modal.Body>
            
              <ControlLabel> <FormattedMessage id="sectionTitle"/> </ControlLabel>
              <FormControl type="text" value={this.state.formTitle} onChange={this.handleTitleChange}
                    placeholder={this.props.intl.messages.sectionTitle} />

              <ControlLabel> <FormattedMessage id="sectionContent"/> </ControlLabel>
              <FormControl componentClass="textarea" value={this.state.formContent} onChange={this.handleContentChange}
                    placeholder={this.props.intl.messages.sectionContent} />
               
               <ControlLabel> <FormattedMessage id="sectionLink"/> </ControlLabel>
              <FormControl type="url" value={this.state.formLink} onChange={this.handleLinkChange}
                    placeholder={this.props.intl.messages.sectionLink} />
              
           
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" bsStyle="primary" onClick={this.handleAddSection}> <FormattedMessage id="submitAdd"/> </Button>
            <Button onClick={this.close}> <FormattedMessage id="cancel"/> </Button>
          </Modal.Footer>
           </form>
        </Modal>

      </span>
    );
  }
}

SectionCreateModal.propTypes = {
  moduleCuid: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  addSectionToRender: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionCreateModal);

