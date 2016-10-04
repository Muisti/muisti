
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import * as bcrypt from 'react-native-bcrypt';
import * as jwt from 'jwt-simple';
import ReactDOM from 'react-dom';
import { fetchToken } from '../../../User/UserActions';
import { UserCreateModal } from '../../../User/components/UserCreateModal';

export class LoginBox extends Component {
    
  email = "";
  
  logIn = () => {
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var email = ReactDOM.findDOMNode(this.refs.email).value;
    fetchToken(email, password, this.setToken);
  }
  
  logOut = () => {
      sessionStorage.removeItem("token");
      this.setState({});
  }
  
  logOut = () => {
      sessionStorage.removeItem("token");
      this.setState({});
  }
  
  setToken = (token) => {
      if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("token", token);
      } else {
        console.log("Sorry, your browser does not support Web Storage...");
      }
      this.setState({});
  }

  render() {
    if (typeof(Storage) !== "undefined") {
        var token = sessionStorage.getItem("token");
        if (token != null) {
        var decoded = jwt.decode(token, token, true);
        var user = decoded.user;
        return (
               <Nav pullLeft>
                <NavItem> Hei {user} </NavItem> 
                <Navbar.Form pullLeft>
                <Button type="submit" bsStyle="warning" onClick={this.logOut}>Kirjaudu ulos</Button>
                </Navbar.Form>
               </Nav>
               );
      
        }
   }
   return (
        <Nav>
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
        <NavItem> <UserCreateModal /> </NavItem>
        </Nav>
    );
  }
}


LoginBox.propTypes = {
    
};

export default LoginBox;