import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Alert, Button, Modal, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import * as bcrypt from 'bcryptjs';
import {addUserRequest, fetchUser, fetchUserByCuid, editUserRequest} from '../UserActions'
import AlertModal, { basicAlert } from '../../App/components/AlertModal';
import {getToken, getTokenPayload} from '../../../util/authStorage'
import sanitizeHtml from 'sanitize-html';

var Header = Modal.Header;
var Title = Modal.Title;
var Body = Modal.Body;
var Feedback = FormControl.Feedback;
var Footer = Modal.Footer;

export class UserCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.isLoading = false;
  };

  componentDidMount() {
      var userToken = getTokenPayload();
      if (userToken) {
          this.initFieldsForEdit(userToken);
      }
  };

  handleAddUser = e => {
    if(e) e.preventDefault();
    const email = this.state.formEmail;
    const error = this.validate();
    this.setState({ error });
    if(error) return;
    
    this.isLoading = true;
    
    fetchUser(email).then(user => {
        this.isLoading = false;
        if(this.state.editing){
          if(user && user.cuid != this.state.userToEdit.cuid){
            this.setState({ error: <FormattedMessage id="userAlreadyExists" values={{user: email}} /> });
          }else{
            this.editUser();
          }
        }
        else{
          if(!user){
            this.createUser();
          }else{
            this.setState({ error: <FormattedMessage id="userAlreadyExists" values={{user: email}} /> });
          }
        }
      });
  };

  editUser = () => {
     var editedUser = this.constructUser();
     editedUser.cuid = this.state.userToEdit.cuid;
     if(this.state.formPassword === ""){
      editedUser.password = sanitizeHtml(this.state.userToEdit.password);
     }
     editUserRequest(editedUser).then(user => {
      if(user){
          this.props.close();
          this.setState({ alert:
            basicAlert((<FormattedMessage id="editSuccessful" />)
                       )});
          this.props.refreshUser(user);
        }else{
            this.setState({ error: (<FormattedMessage id="editFailed" />) });
        }
     });
  };

  createUser = () => {
    console.log("CREATEUSERISSA");
    addUserRequest(this.constructUser()).then(user => {
        if(user){
          this.props.close();
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
  };


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
    if(this.state.editing && this.state.formPassword == "" && this.state.formPassVerify == "" ){
      return true;
    }
    var pass = this.state.formPassword;
    var verifier = this.state.formPassVerify;
    if (pass.length < 8 || pass.length > 18 || pass != verifier) {
      return false;
    }
    return true;
  };

  validatePasswordVerify = () => {
    var pass = this.state.formPassword;
    var verifier = this.state.formPassVerify;
    return verifier.length < pass.length || verifier == pass;
  };

  handleChange = key => e => {
    this.state[key] = e.target.value;
    this.colorController(key);
    this.setState({});
  };

  clearError = () => {
    if(this.state.error){ this.setState({ error: null }); }
  };

  colorController = (key) => {
    var str = 'color' + key;
    if (this.state[key] == null) {
      this.setState({ [str]: null });
    } else if (key == 'formPassVerify') {
      if (this.validatePassword()) {
        this.setState({ [str]: 'success'});
        this.clearError();
      } else if(!this.validatePasswordVerify()) {
        this.setState({ [str]: 'error', error: (<FormattedMessage id="verifyError" />) });
      }else {
        this.setState({ [str]: 'warning'});
        this.clearError();
      }
    } else if (key == 'formEmail') {
        if (this.validateEmail()) {
            this.setState({ [str]: 'success' });
        } else {
            this.setState({ [str]: 'warning'});
      }
    } else if (key == 'formPassword') {
        if (this.validatePassword()) {
            this.clearError();
            this.setState({ colorformPassVerify: 'success' });
        } else {
            this.setState({ colorformPassVerify: null });
        }
    }
  };

  initFieldsForEdit = (token) => {
    fetchUserByCuid( token.cuid ).then(user => {
      this.setState({formEmail: user.email, formName: user.name, 
                    formSurname: user.surname, formPassword: "", formPassVerify: "", 
                    userToEdit: user, editing: true});
    });
  };

  registerField = (controlId, type, placeholder) => {
    var key = controlId;
    if(this.state[key] === undefined){
      this.state[key] = '';
    }
    if (this.state['color'+key] === undefined) {
        this.state['color'+key] = null;
    }
    return (
      <FormGroup controlId={controlId} validationState={this.state['color'+key]}>
        <Col componentClass={ControlLabel} sm={2}>
          <FormattedMessage id={controlId} />
        </Col>
        <Col sm={10}>
          <FormControl type={type} value={this.state[key]} onChange={this.handleChange(key)} placeholder={placeholder} />
          <Feedback />
        </Col>
      </FormGroup>
    );
  };

  render() {
    return (
      <span>
        <Modal show={this.props.show} onHide={() => {this.props.close();}}>
          <Header closeButton>
            <Title><FormattedMessage id={'registerTitle'} /></Title>
          </Header>
          <Form onSubmit={this.handleAddUser} horizontal>
          <Body>
            
              {this.registerField('formEmail', "email", 'matti.meikalainen@gmail.com')}
              {this.registerField('formName', "text", 'Matti')}
              {this.registerField('formSurname', "text", 'Meikäläinen')}
              {this.registerField('formPassword',  "password", 'Salasana')}
              {this.registerField('formPassVerify', "password", 'Salasana')}
           
            <div className={this.state.error ? '' : 'hidden'}>
                <Alert bsStyle="warning">
                    <b>{this.state.error}</b>
                </Alert>
            </div>
          </Body>
          <Footer>
            <Button type="submit" bsStyle="primary" disabled={this.isLoading} >
                <FormattedMessage id={this.state.editing ? 'displayEditModal' : 'displayRegisterModal'} />
            </Button>
            <Button onClick={this.props.close}><FormattedMessage id='cancel' /></Button>
          </Footer>
          </Form>
        </Modal>
        <AlertModal message={this.state.alert} />
      </span>
    );
  }
}

UserCreateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refreshUser: PropTypes.func
};

export default UserCreateModal;
