import React, { Component, PropTypes } from 'react';
import { Alert, Button, Modal, Col, Form, FormGroup, FormControl, ControlLabel, FieldGroup } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { addSectionRequest } from '../SectionActions'
import validator from 'validator'

export class SectionCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  };

  clearFields = () => {
    this.setState({formTitle: "", formContent: "", formLink: "" });
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };
  
  openEditor = e => {
    e.stopPropagation();
    this.setState({ showModal: true, formTitle: this.props.section.title,
                    formContent: this.props.section.content, formLink: this.props.section.link});
  }

  handleTitleChange = (e) => {
    this.setState({ formTitle: e.target.value });
  };

  handleContentChange = (e) => {
    this.setState({ formContent: e.target.value });
  };

  handleLinkChange = (e) => {
    this.setState({ formLink: e.target.value, error: "" });
  }

  sendSection = (e) => {
    if(e) e.preventDefault();
    this.setState({error: this.validateLink()})    
    
    //Jos molemmat pakollisista kentistä, tai ei URL niin validointi false
    if ((!this.state.formContent && !this.state.formLink) || this.validateLink()) return false;

    let newSection = {};
    newSection.content = this.state.formContent;
    newSection.title = this.state.formTitle;
    newSection.link = this.state.formLink;
    
    if (this.props.editSection) {
        this.props.editSection(newSection.content, newSection.title, newSection.link);
    } else {
        this.props.addSection(newSection);
    }
    this.clearFields();
    this.close();
  };

  validateLink = () => {
    if(this.state.formLink && !validator.isURL(this.state.formLink))
      return (<FormattedMessage id="sectionLinknotValid" />);
    else 
      return "";
  }
  
  chooseButton = () => {
      if (!this.props.editSection) {
          return (
            <Button onClick={this.open} bsStyle="primary">
                <FormattedMessage id="addSection"/>
            </Button>
          );
      } else {
          return (
            <Button onClick={this.openEditor} bsStyle="warning" bsSize="xsmall" className="pull-right">
                MUOKKAA SECTIONIA
            </Button>
          );
      }
  };
  
  render() {
    return (
      <span>
        {this.chooseButton()}
        
        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="addingSection"/></Modal.Title>
          </Modal.Header>
          <form onSubmit={this.sendSection}>
          <Modal.Body>
            
              <ControlLabel> <FormattedMessage id="sectionTitle"/> </ControlLabel>
              <FormControl type="text" value={this.state.formTitle} onChange={this.handleTitleChange}
                    placeholder={this.props.intl.messages.sectionTitle} />

              <ControlLabel> <FormattedMessage id="sectionContent"/> </ControlLabel>
              <FormControl componentClass="textarea" value={this.state.formContent} onChange={this.handleContentChange}
                    placeholder={this.props.intl.messages.sectionContent} />
               
               <ControlLabel> <FormattedMessage id="sectionLink"/> </ControlLabel>
              <FormControl type="text" value={this.state.formLink} onChange={this.handleLinkChange}
                    placeholder={this.props.intl.messages.sectionLink} />
              
           
          </Modal.Body>

          <Modal.Footer>
             <div className={this.state.error ? '' : 'hidden'}>
                <Alert bsStyle="warning">
                    <b>{this.state.error}</b>
                </Alert>
            </div>
            <Button type="submit" bsStyle="primary" > <FormattedMessage id="submitAdd"/> </Button>
            <Button onClick={this.close}> <FormattedMessage id="cancel"/> </Button>
          </Modal.Footer>
           </form>
        </Modal>

      </span>
    );
  }
}

SectionCreateModal.propTypes = {
  addSection: PropTypes.func,
  editSection: PropTypes.func,
  section: PropTypes.shape({
    cuid: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    quizzes: PropTypes.array,
    orderNumber: PropTypes.number
  }),
  intl: intlShape.isRequired
};

export default injectIntl(SectionCreateModal);