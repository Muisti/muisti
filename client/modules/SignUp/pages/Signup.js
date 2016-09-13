/**
 * Created by susisusi on 12/09/16.
 */
/*
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import {Grid, Row, Col, Panel, Pagination,Button, Well, Label, Input, ButtonInput, MenuItem} from 'react-bootstrap';
/*import {LinkContainer} from 'react-router-bootstrap';*/
/*import auth from './../../services/Authentication';*/


/*
import { connect } from 'react-redux';

// Import Components


// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../../Post/PostActions';
import { toggleAddPost } from '../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../App/AppReducer';


class Signup extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {};
    this.state.userInfo = {};
    this.state.error = '';
    this.state.email = '';
    this.state.password = '';
    this.validPassword=false;
    this.history = props.history;
    this.handleInputFirstName = this.handleInputFirstName.bind(this);
    this.handleInputLastName = this.handleInputLastName.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputUserName = this.handleInputUserName.bind(this);
    this.handleInputPassword =  this.handleInputPassword.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }


  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  };

  validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  handleInputFirstName(e){
    this.validFirstName= e.target.value!=="" ? true : false;
    this.state.userInfo.firstName = e.target.value;
    this.setState({userInfo: this.state.userInfo});
    this.setState({error:''});
  }

  handleInputLastName(e){
    this.validLastName= e.target.value!=="" ? true : false;
    this.state.userInfo.lastName = e.target.value;
    this.setState({userInfo: this.state.userInfo});
    this.setState({error:''});
  }

  handleInputEmail(e){
    this.validEmail= this.validateEmail(e.target.value)
    this.state.userInfo.email = e.target.value;
    this.setState({userInfo : this.state.userInfo});
    this.setState({error:''});
  }

  handleInputUserName(e){
    this.validUserName= e.target.value!=="" ? true : false;
    this.state.userInfo.username = e.target.value;
    this.setState({userInfo: this.state.userInfo});
    this.setState({error:''});
  }

  handleInputPassword(e){
    this.setState({error : ''});
    if(e.target.value.length < 6){
      this.validatePassword= false;
    }
    else {
      this.validPassword= true;
      this.state.userInfo.password = e.target.value;
    }
    this.setState({userInfo: this.state.userInfo});
  }

  formSubmit(e) {
    e.preventDefault();

    if(!this.validFirstName){
      this.setState({error : 'Please Input the First Name'});
    }
    else if(!this.validLastName){
      this.setState({error : 'Please Input the Last Name'});
    }
    else if(!this.validEmail){
      this.setState({error : 'Please Input Correct Email Address'});
    }
    else if(!this.validUserName){
      this.setState({error : 'Please Input the User Name'});
    }
    else if(!this.validPassword){
      this.setState({error : 'Password Should Be Longer than 6 Charecters'});
    }
    else{
      var newUser = this.state.userInfo;
      auth.signup(newUser);
    }
  }

  render() {
    return(
      <Grid>
        <Row>
          <h2>
            Sign up Using Email
          </h2>
          <hr/>
          <Col md={12}>
            <form onSubmit={this.formSubmit}>
              <Input
                placeholder="First Name"
                onChange={this.handleInputFirstName}
                label="First Name"
                type ="text" />
              <br/>
              <Input
                placeholder="Last Name"
                onChange={this.handleInputLastName}
                label ="Last Name"
                type ="text"/>
              <br/>
              <Input
                placeholder="Enter Email"
                onChange={this.handleInputEmail}
                label="Email"
                type ="text"/>
              <br/>
              <Input
                placeholder="User Name"
                onChange={this.handleInputUserName}
                label="User Name"
                type ="text"/>
              <br/>
              <Input
                placeholder="Enter Password"
                onChange={this.handleInputPassword}
                label="Password"
                type="password" />
              <br/>
                 <p>{this.state.error}</p>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}
// Actions required to provide data for this component to render in sever side.
Signup.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state)
  };
}

Signup.propTypes = {
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

Signup.contextTypes = {
  router: React.PropTypes.object
};

export default connect(mapStateToProps)(Signup);


*/  
