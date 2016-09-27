import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Modal, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class UserCreateModal extends Component {

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

  render() {

    return (
      <div>
        <Button bsStyle="primary" onClick={this.open}>
          <FormattedMessage id='displayRegisterModal' />
        </Button>
        
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Rekisteröidy tästä</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
          <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                </FormGroup>
        
                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>
          </Form>
          </Modal.Body>
  
          <Modal.Footer>
            <Button onClick={this.close}>Peruuta</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
}

UserCreateModal.propTypes = {
      
};

export default UserCreateModal;