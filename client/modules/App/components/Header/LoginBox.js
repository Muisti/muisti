
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Fade, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import * as bcrypt from 'react-native-bcrypt';
import * as jwt from 'jwt-simple';
import ReactDOM from 'react-dom';
import { fetchToken } from '../../../User/UserActions';
import { UserCreateModal } from '../../../User/components/UserCreateModal';

export class LoginBox extends Component {

  constructor() {
    super();
    this.state = { validEmail: "" };
    this.state = { validPass: "" };
    this.state = { isLoading: false };
  }

  logIn = () => {
      this.setState({ isLoading: true });
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var email = ReactDOM.findDOMNode(this.refs.email).value;
    this.setValidationState(true);
    fetchToken(email, password, this.setToken);
  }
  
  logOut = () => {
      sessionStorage.removeItem("token");
      this.setState({});
  }
  
  

  setToken = (token) => {
      console.log(token);
      if (typeof(Storage) == "undefined") {
        console.log("Sorry, your browser does not support Web Storage...");
      } else if (token == undefined) {
        console.log("pass not valid")
        this.setValidationState(false, "validPass");
      }else if (token == "emailNotValid"){

        this.setValidationState(false);
      }else {
        sessionStorage.setItem("token", token);
      }
      this.setState({ isLoading: false });
      this.setState({});
  }

   setValidationState(isValid, validState) {
    if(isValid && !validState){
      this.setState({ validEmail: "success" });
      this.setState({ validPass: "success" });
    } else if (isValid) {
      this.setState({ [validState]: "success" }); 
    } else if (!isValid && !validState) {
      this.setState({ validEmail: "error" });
      this.setState({ validPass: "warning" });
    } else {
      this.setState({ [validState]: "error" });
    }
   }



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
                <Button type="submit" bsStyle="warning" onClick={this.logOut}>Kirjaudu ulos</Button>
                </Navbar.Form>
               </Nav>
               );
      
        }
   }
      var isLoading = this.state.isLoading;
   return (
        <Nav>
        <Navbar.Form pullLeft> 
                <FormGroup controlId="emailForm" validationState={this.state.validEmail} >
                  <FormControl type="email" placeholder="Sähköposti" ref="email"/>
                  <FormControl.Feedback />
                </FormGroup>
                {' '}
                <FormGroup controlId="passwordForm" validationState={this.state.validPass}>
                  <FormControl type="password" placeholder="Salasana" ref="password"/>
                  <FormControl.Feedback />
                </FormGroup>
                {' '}
                <Button type="submit" bsStyle="primary" disabled={isLoading} onClick={this.logIn}>
                {isLoading ? 'Kirjaudutaan' : 'Kirjaudu'}
                </Button>
                {' '}
                <UserCreateModal />
          </Navbar.Form>
      </Nav>
    );
  }
}


LoginBox.propTypes = {
    
};

export default LoginBox;