import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Fade, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import * as bcrypt from 'react-native-bcrypt';
import * as jwt from 'jwt-simple';
import ReactDOM from 'react-dom';
import { fetchToken } from '../../../User/UserActions';
import { UserCreateModal } from '../../../User/components/UserCreateModal';
import AlertModal, { errorAlert } from '../AlertModal';


export class LoginBox extends Component {

  constructor() {
    super();
    this.state = { validEmail: "" };
    this.state = { validPass: "" };
    this.state = { isLoading: false };
  }


  emailChange = event => this.setState({ validEmail: "" });
  passwordChange = event => this.setState({ validPass: "" });

  logIn = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var email = ReactDOM.findDOMNode(this.refs.email).value;

    this.setValidationState("unknown");
    fetchToken(email, password, this.setToken);
  };

  logOut = () => {
    sessionStorage.removeItem("token");
    this.setState({});
  }


  setToken = (token) => {
      
      if (typeof(Storage) == "undefined") {
        console.log("Sorry, your browser does not support Web Storage...");
      } else if (token == undefined) {
        
        this.setValidationState("password");
      } else if (token == "emailNotValid"){
        
        this.setValidationState("email");
      } else if(token == "notConfirmed"){
        this.setState({ alert: 
            errorAlert( (<FormattedMessage id="notConfirmedTitle" />),
                        (<FormattedMessage id="notConfirmedInfo" />)) });
      } else {
        this.setValidationState("nothing");
        sessionStorage.setItem("token", token);
        this.setValidationState("unknown");
        }
      
      this.setState({ isLoading: false });
  }

  setValidationState(invalidState) {
    if(invalidState == "nothing"){
      this.setState({ validEmail: "success" });
      this.setState({ validPass: "success" });
    } else if (invalidState == "password") {
      this.setState({ validEmail: "success" });
      this.setState({ validPass: "error" })
    } else if (invalidState == "email") {
      this.setState({ validEmail: "error" });
      this.setState({ validPass: "warning" });
    } else if(invalidState == "unknown") {
      this.setState({ validEmail: "" });
      this.setState({ validPass: "" });
    }
  };

  render() {

    if (typeof(Storage) !== "undefined") {
      var token = sessionStorage.getItem("token");
      if (token != null && token != 'undefined') {
        var decoded = jwt.decode(token, "token", true);
        var user = decoded.user;
        return (   
          <Nav pullLeft>
            <NavItem> Hei {user} </NavItem>
            <Navbar.Form pullLeft>
              <Button type="submit" bsStyle="warning" onClick={this.logOut} >Kirjaudu ulos</Button>
            </Navbar.Form>
            <AlertModal message={this.state.alert} />
          </Nav>
        );

      }
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
  
};

export default LoginBox;
