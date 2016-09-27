/**
 * Created by susisusi on 12/09/16.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { addUserRequest, addUser} from '../UserActions';


export class Signup extends Component {

  constructor(){
    super();
  }

  addUser = () => {
    const firstnameRef = this.refs.firstname;

    const lastnametRef = this.refs.lastname;
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
      this.props.addUser(firstnameRef.value, lastnametRef.value, emailRef.value, passwordRef.value);
    alert(this.refs.firstname.value);
      firstnameRef.value = lastnametRef.value = emailRef.value = passwordRef.value = '';


  };


  render() {
    return (

      <div>
        <h2>
          Rekisteröidy
        </h2>
        <br />
        <form>
          <input placeholder={"Etunimi"}  label="First Name" type="text" ref="firstname" />
          <br />
          <br />
          <input placeholder={"Sukunimi"} label="Last Name" type="text" ref="lastname" />
          <br />
          <br />
          <input placeholder={"Sähköpostiosoite"}  label="Email" type="text" ref="email" />
          <br />
          <br />
          <input placeholder={"Salasana"}  label="Enter Password" type="text" ref="password" />
          <br />
          <br />
          <button type="submit" onClick={this.addUser}> Rekisteröidy nyt! </button>
        </form>
      </div>
    );
  }
}


export default injectIntl(Signup);
