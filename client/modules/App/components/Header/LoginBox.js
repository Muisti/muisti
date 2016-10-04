
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import * as bcrypt from 'react-native-bcrypt';
import ReactDOM from 'react-dom';
import { fetchToken } from '../../../User/UserActions';

export class LoginBox extends Component {
    
  email = "";
  
  logIn = () => {
    
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var email = ReactDOM.findDOMNode(this.refs.email).value;
    fetchToken(email, password, setToken);
  }
  
  setToken = (token) => {
      if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("token", token);
      } else {
        alert("Sorry, your browser does not support Web Storage...");
      }
  }

  render() {

    return (
        <Navbar.Form pullLeft> 
                <FormGroup controlId="emailForm">
                  <FormControl type="email" placeholder="Sähköposti" ref="email"/>
                  <FormControl.Feedback />
                </FormGroup>
                {' '}
                <FormGroup controlId="passwordForm">
                  <FormControl type="password" placeholder="Salasana" ref="password"/>
                  <FormControl.Feedback />
                </FormGroup>
                {' '}
                <Button type="submit" onClick={this.logIn}>Kirjaudu</Button>
        </Navbar.Form>
        );
  }
}


LoginBox.propTypes = {
    
};

export default LoginBox;