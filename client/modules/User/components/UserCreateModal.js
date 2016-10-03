import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Alert, Button, Modal, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import * as bcrypt from 'react-native-bcrypt';
import {addUserRequest, fetchUser} from '../UserActions' 

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
  

  handleAddUser = (name, surname, email) => {
    fetchUser(email, user => {
        if(!user){
          var password = this.hash();
          addUserRequest({ name, surname, email, password });
          this.close();
        }else{
          setState({ error: "Käyttäjä löytyy jo!" });
        }
    });
      
    //
  };
    
  hash = () => {
      var hashed = this.state.formPassword;
      var presalt = (Math.random * (10 + this.state.formEmail.length))+10;
      var salt = bcrypt.genSaltSync(Math.ceil(presalt));
      hashed = bcrypt.hashSync(hashed, salt);
      
      return hashed;
  };
  
  validate = () => {
    var error = '';
    if (!this.validateEmail()) {
        error = "Sähkopostissasi on kirjoitusvirhe";
    } else if (this.state.formName == '' || this.state.formSurname == '') {
        error = "Onko sinulla etunimi ja sukunimi oikein kirjoitettuna? Tarkista nimesi henkilöllisyystodistuksesta";
    } else if (!this.validatePassword()) {
        error = "Salasanassasi on jotakin häikkää. Salasanan on oltava yli 8 merkkiä pitkä ja salasanojen on täsmättävä";
    } else {        
        this.handleAddUser(this.state.formName, this.state.formSurname, this.state.formEmail);
        return;
    }
    this.setState({ error });
  };
  
  validateEmail = () => {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(this.state.formEmail);
  };
  


  validatePassword = () => {
      var pass = this.state.formPassword;
      var verifier = this.state.formPassVerify;
      if (pass.length < 8) {
          return false;
      } else if ( pass != verifier ) {
          return false;
      }
      return true;
  };
  
  handleChange = key => e => {
        this.state[key] = e.target.value;
        this.setState({});
  };
  
  registerField = (controlId, label, type, placeholder) => {
    var key = controlId;
    if(this.state[key] === undefined){
        this.state[key] = '';
    } 
    return ( 
        <FormGroup controlId={controlId}>
          <Col componentClass={ControlLabel} sm={2}>
            {label}
          </Col>
          <Col sm={10}>
            <FormControl type={type} value={this.state[key]} onChange={this.handleChange(key)} placeholder={placeholder} />

          </Col>
        </FormGroup>
        );
    };


  render() {

    return (
      <div>
        <li onClick={this.open}>
          <FormattedMessage id='displayRegisterModal' />
        </li>
        
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Rekisteröidy tästä</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
          <Form horizontal>
                
                {this.registerField('formEmail', 'Sähköposti', "email", 'matti.meikalainen@gmail.com')}
                {this.registerField('formName', 'Etunimi', "text", 'Matti')}
                {this.registerField('formSurname', 'Sukunimi', "text", 'Meikäläinen')}
                {this.registerField('formPassword', 'Salasana', "password", 'Salasana')}
                {this.registerField('formPassVerify', 'Vahvista salasana', "password", 'Salasana')}
        
          </Form>
            <Alert bsStyle="warning" >
                {this.state.error}
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.validate}> Rekisteröidy </Button>
            <Button onClick={this.close}>Peruuta</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  

}

UserCreateModal.propTypes = {
  dispatch: PropTypes.func.isRequired,    
};

export default UserCreateModal;