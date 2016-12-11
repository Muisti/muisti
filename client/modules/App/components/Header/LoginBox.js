import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Fade, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jwt-simple';
import ReactDOM from 'react-dom';

// Importing components
import { fetchToken } from '../../../User/UserActions';
import { UserCreateModal } from '../../../User/components/UserCreateModal';
import AlertModal, { errorAlert } from '../AlertModal';
import { setToken, removeToken, getTokenPayload } from '../../../../util/authStorage';


export class LoginBox extends Component {

  constructor() {
    super();
    this.state = { validEmail: null, validPass: null, 
        isLoading: false, showModal: false };
  }

  emailChange = event => this.setState({ validEmail: null });
  passwordChange = event => this.setState({ validPass: null });

  closeModal = () => {
      this.setState({ showModal: false });
  };
  
  openModal = () => {
      this.setState({ showModal: true });
  };

  logIn = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var email = ReactDOM.findDOMNode(this.refs.email).value;
    if (!password || !email) {
      this.setValidationState("email");
    } else {
      fetchToken(email, password, this.checkToken);
    }
  };

  logOut = () => {
    removeToken("token");
    this.props.fetchPosts();
    this.props.fetchModules();
    this.setState({});
  };

  refreshUser = (user) => {
    fetchToken(user.email, user.password, this.checkToken);
  }; 

  checkToken = (token) => {
      switch (token) {
          case undefined:
            this.setValidationState("password");
            break;
          case "emailNotValid":
            this.setValidationState("email");
            break;
          case "notConfirmed":
            this.setState({ alert:
              errorAlert( (<FormattedMessage id="notConfirmedTitle" />),
                        (<FormattedMessage id="notConfirmedInfo" />)) });
            break;
          default:
            setToken(token);
            this.setValidationState();
            this.props.fetchPosts();
            this.props.fetchModules();
            break;
      }
  };

  setValidationState(invalidState) {
      this.setState({ isLoading: false });
      switch (invalidState) {
         case "password":
            this.setState({ validEmail: "success" });
            this.setState({ validPass: "error" });
            break;
          case "email":
            this.setState({ validEmail: "error" });
            this.setState({ validPass: "warning" });
            break;
          default:
            this.setState({ validEmail: null });
            this.setState({ validPass: null });
            break;
      }
  };

  render() {
    var payload = getTokenPayload();
    if (payload) {
      return (
        <Nav pullLeft>
          <NavDropdown title={(<FormattedMessage id={'logInUser'} values={{user: payload.user + '!'}} />)}>
            <MenuItem eventKey="1">
              <Button onClick={this.openModal} bsStyle='link'>
                <FormattedMessage id={'displayEditMenuItem'}/>
              </Button>
            </MenuItem>
          </NavDropdown>
          <Navbar.Form pullLeft>
            <Button href={window.location.pathname != '/' ? '/' : '#'} type="submit" bsStyle="warning" onClick={this.logOut} >
              <FormattedMessage id={'logOutButton'} />
            </Button>
          </Navbar.Form>
          <AlertModal message={this.state.alert} />
          <UserCreateModal refreshUser={this.refreshUser}
                show={this.state.showModal} close={this.closeModal}/>
        </Nav>
        );
      }

    var isLoading = this.state.isLoading;

    return (
      <Nav>
        <Navbar.Form pullLeft>
          <form>
            <FormGroup controlId="emailForm" validationState={this.state.validEmail} >
              <FormControl type="email" placeholder={this.props.intl.messages.formEmail}
                    onChange={this.emailChange} ref="email"/>
              <FormControl.Feedback />
            </FormGroup>
            {' '}
            <FormGroup controlId="passwordForm" validationState={this.state.validPass}>
              <FormControl type="password" placeholder={this.props.intl.messages.formPassword}
                    onChange={this.passwordChange} ref="password"/>
              <FormControl.Feedback />
            </FormGroup>
            {' '}
            <Button type="submit" bsStyle="primary" disabled={isLoading} onClick={this.logIn}>
              <FormattedMessage id={isLoading ? "loggingIn" : 'logInButton'} />
            </Button>
            {' '}
            <Button onClick={this.openModal} bsStyle="primary">
                <FormattedMessage id={'displayRegisterModal'}/>
            </Button>
            <UserCreateModal refreshUser={this.refreshUser} 
                show={this.state.showModal} close={this.closeModal}/>
          </form>
        </Navbar.Form>
        <AlertModal message={this.state.alert} />
      </Nav>
    );
  };
}

LoginBox.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  fetchModules: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default LoginBox;