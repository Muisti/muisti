/**
 * Created by susisusi on 12/09/16.
 */
import React from 'react';
import { connect } from 'react-redux';


class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.state.userInfo = {};
    this.state.error = '';
    this.state.email = '';
    this.state.password = '';
    this.validPassword = false;
    this.handleInputFirstName = this.handleInputFirstName.bind(this);
    this.handleInputLastName = this.handleInputLastName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputUserName = this.handleInputUserName.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  validateEmail(email) {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  handleInputFirstName(e) {
    this.validFirstName = e.target.value !== '';
    this.state.userInfo.firstName = e.target.value;
    this.setState({ userInfo: this.state.userInfo });
    this.setState({ error: '' });
  }

  handleInputLastName(e) {
    this.validLastName = e.target.value !== '';
    this.state.userInfo.lastName = e.target.value;
    this.setState({ userInfo: this.state.userInfo });
    this.setState({ error: '' });
  }

  handleInputEmail(e) {
    this.validEmail = this.validateEmail(e.target.value);
    this.state.userInfo.email = e.target.value;
    this.setState({ userInfo: this.state.userInfo });
    this.setState({ error: '' });
  }

  handleInputUserName(e) {
    this.validUserName = e.target.value !== '';
    this.state.userInfo.username = e.target.value;
    this.setState({ userInfo: this.state.userInfo });
    this.setState({ error: '' });
  }

  handleInputPassword(e) {
    this.setState({ error: '' });
    if (e.target.value.length < 6) {
      this.validatePassword = false;
    } else {
      this.validPassword = true;
      this.state.userInfo.password = e.target.value;
    }
    this.setState({ userInfo: this.state.userInfo });
  }

  formSubmit(e) {
    e.preventDefault();

    if (!this.validFirstName) {
      this.setState({ error: 'Please Input the First Name' });
    } else if (!this.validLastName) {
      this.setState({ error: 'Please Input the Last Name' });
    } else if (!this.validEmail) {
      this.setState({ error: 'Please Input Correct Email Address' });
    } else if (!this.validUserName) {
      this.setState({ error: 'Please Input the User Name' });
    } else if (!this.validPassword) {
      this.setState({ error: 'Password Should Be Longer than 6 Charecters' });
    } else {
      //    const newUser = this.state.userInfo;
      //    auth.signup(newUser);
    }
  }

  render() {
    return (

      <div>
        <h2>
          Rekisteröidy
        </h2>
        <br />
        <form onSubmit={this.formSubmit}>
          <input placeholder={"Etunimi"} ref="name" onChange={this.handleInputFirstName} label="First Name" type="text" />
          <br />
          <br />
          <input placeholder={"Sukunimi"} ref="LastName" onChange={this.handleInputLastName} label="Last Name" type="text" />
          <br />
          <br />
          <input placeholder={"Sähköpostiosoite"} ref="Email" onChange={this.handleInputEmail} label="Email" type="text" />
          <br />
          <br />
          <input placeholder={"Käyttäjätunnus"} ref="User" onChange={this.handleInputUserName} label="User Name" type="text" />
          <br />
          <br />
          <input placeholder={"Salasana"} ref="Password" onChange={this.handleInputPassword} label="Enter Password" type="text" />
          <br />
          <br />
          <button type="submit"> Rekisteröidy nyt! </button>
          <br />
          <br />
          <p>{this.state.error}</p>
        </form>
      </div>
    );
  }
}


function mapStateToProps() {
  return {

  };
}
export default connect(mapStateToProps)(Signup);
