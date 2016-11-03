import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Fade, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import * as bcrypt from 'react-native-bcrypt';
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
    this.state = { validEmail: null };
    this.state = { validPass: null };
    this.state = { isLoading: false };
  }


  emailChange = event => this.setState({ validEmail: null });
  passwordChange = event => this.setState({ validPass: null });

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
    this.setState({});
  }


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
            break;
      }
  }

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
          <NavItem> Hei {payload.user} </NavItem>
          <Navbar.Form pullLeft>
            <Button href={window.location.pathname != '/' ? '/' : '#'} type="submit" bsStyle="warning" onClick={this.logOut} >Kirjaudu ulos</Button>
          </Navbar.Form>
          <AlertModal message={this.state.alert} />
        </Nav>
        );
      }
    
    var isLoading = this.state.isLoading;

    return (
      <Nav>
        <Navbar.Form pullLeft>
          <form>
            <FormGroup controlId="emailForm" validationState={this.state.validEmail} >
              <FormControl type="email" placeholder='Sähköposti' onChange={this.emailChange} ref="email"/>
              <FormControl.Feedback />
            </FormGroup>
            {' '}
            <FormGroup controlId="passwordForm" validationState={this.state.validPass}>
              <FormControl type="password" placeholder="Salasana" onChange={this.passwordChange} ref="password"/>
              <FormControl.Feedback />
            </FormGroup>
            {' '}
            <Button type="submit" bsStyle="primary" disabled={isLoading} onClick={this.logIn}>
              <FormattedMessage id={isLoading ? "loggingIn" : 'logInButton'} />
            </Button>
            {' '}
            <UserCreateModal />
          </form>
        </Navbar.Form>
        <AlertModal message={this.state.alert} />
      </Nav>
    );
  };
}

LoginBox.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
};

export default LoginBox;
