import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Alert, Button, Modal, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import * as bcrypt from 'react-native-bcrypt';
import {addUserRequest, fetchUser} from '../UserActions'
import AlertModal, { basicAlert } from '../../App/components/AlertModal';

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

  handleAddUser = () => {
    const email = this.state.formEmail;
    const error = this.validate();
    this.setState({ error });
    if(error) return;
    fetchUser(email).then(user => {
        if(!user){
          this.createUser();
        }else{
          this.setState({ error: <FormattedMessage id="userAlreadyExists" values={{user: email}} /> });
        }
      });
  };
  
  createUser = () => {
    const state = this.state;
    const password = this.hashedPassword();
    addUserRequest(this.constructUser()).then(user => {
        if(user){
          this.close();
          this.setState({ alert: 
            basicAlert((<FormattedMessage id="registrationSuccessful_title" />), 
                       (<FormattedMessage id="registrationSuccessful_info" />))});
        }else{
            this.setState({ error: (<FormattedMessage id="sendConfirmFail" />) }); 
        }
    });
  };

  constructUser = () => {
    return {
      name: this.state.formName,
      surname: this.state.formSurname,
      email: this.state.formEmail,
      password: this.hashedPassword()
    };
  }


  hashedPassword = () => {
    var hashed = this.state.formPassword;
    var presalt = (Math.random * (10 + this.state.formEmail.length))+10;
    var salt = bcrypt.genSaltSync(Math.ceil(presalt));
    hashed = bcrypt.hashSync(hashed, salt);

    return hashed;
  };

  validate = () => {
    var error = '';
    if (!this.validateEmail()) {
      error = (<FormattedMessage id="emailNotValid" />);
    } else if (this.state.formName == '' || this.state.formSurname == '') {
      error = (<FormattedMessage id="nameNotValid" />);
    } else if (!this.validatePassword()) {
      error = (<FormattedMessage id="passwordNotValid" />);
    }
    return error;
  };

  validateEmail = () => {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(this.state.formEmail);
  };

  validatePassword = () => {
    var pass = this.state.formPassword;
    var verifier = this.state.formPassVerify;
    if (pass.length < 8 || pass.length > 18 || pass != verifier) {
      return false;
    }
    return true;
  };

  handleChange = key => e => {
    this.state[key] = e.target.value;
    this.setState({});
  };

  registerField = (controlId, type, placeholder) => {
    var key = controlId;
    if(this.state[key] === undefined){
      this.state[key] = '';
    }
    return (
      <FormGroup controlId={controlId}>
        <Col componentClass={ControlLabel} sm={2}>
          <FormattedMessage id={controlId} />
        </Col>
        <Col sm={10}>
          <FormControl type={type} value={this.state[key]} onChange={this.handleChange(key)} placeholder={placeholder} />

        </Col>
      </FormGroup>
    );
  };


  render() {
      
    return (
      <span>
        <Button onClick={this.open} bsStyle="primary"><FormattedMessage id='displayRegisterModal' /> </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id='registerTitle' /></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form horizontal>

              {this.registerField('formEmail', "email", 'matti.meikalainen@gmail.com')}
              {this.registerField('formName', "text", 'Matti')}
              {this.registerField('formSurname', "text", 'Meikäläinen')}
              {this.registerField('formPassword',  "password", 'Salasana')}
              {this.registerField('formPassVerify', "password", 'Salasana')}

            </Form>
            <div className={this.state.error ? '' : 'hidden'}>
                <Alert bsStyle="warning">
                    <b>{this.state.error}</b>
                </Alert>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleAddUser}> Rekisteröidy </Button>
            <Button onClick={this.close}>Peruuta</Button>
          </Modal.Footer>
        </Modal>

      </span>
    );
  }
}

UserCreateModal.propTypes = {

};

export default UserCreateModal;
