
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
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
  }

  
  emailChange = event => this.setState({ validEmail: "" });
  passwordChange = event => this.setState({validPass: ""});
  


  logIn = () => {
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var email = ReactDOM.findDOMNode(this.refs.email).value;
    this.setValidationState("unknown");
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
      console.log(token);
      if (typeof(Storage) == "undefined") {
        console.log("Sorry, your browser does not support Web Storage...");
      } else if (token == undefined) {
        console.log("pass not valid")
        this.setValidationState("password");
      }else if (token == "emailNotValid"){
        console.log("email");
        this.setValidationState("email");
      }else {
        this.setValidationState("nothing");
        sessionStorage.setItem("token", token);
        this.setValidationState("unknown");
        }
      
      this.setState({});
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
                <Button type="submit" bsStyle="warning" onClick={this.logOut} >Kirjaudu ulos</Button>
                </Navbar.Form>
               </Nav>
               );
      
        }
   }
   return (
        <Nav>
        <Navbar.Form pullLeft> 
                <FormGroup controlId="emailForm" validationState={this.state.validEmail} >
                  <FormControl type="email" placeholder="Sähköposti" onChange={this.emailChange} ref="email"/>
                  <FormControl.Feedback />
                </FormGroup>
                {' '}
                <FormGroup controlId="passwordForm" validationState={this.state.validPass}>
                  <FormControl type="password" placeholder="Salasana" onChange={this.passwordChange} ref="password"/>
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