import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UserCreateModal } from '../../../User/components/UserCreateModal';
import { connect } from 'react-redux';
import * as jwt from 'jwt-simple';

class Muisti extends Component {
    constructor() {
        super();
    }

    storageOutput = () => {
        if (typeof(Storage) !== "undefined") {
            // Store
            var payload = { user: 'Matti' };
            var secret = 'salasana';
            var token = jwt.encode(payload, secret);
            sessionStorage.setItem("token", token);
            // Retrieve
            return (
                <li> Token: { sessionStorage.getItem("token") } </li>
            );
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
        }
    }

  render() {
      console.log("RENDERING: " + this.params);
      
    return (
      <div>
        <Button bsStyle="danger"> Testinappi </Button>
        <UserCreateModal />
        {this.storageOutput()}
        <p>Muistiprojekti ....</p>
        
      </div>
    );
  }
}

function mapStateToProps() {
  return {
      
  };
}

export default connect(mapStateToProps)(Muisti);
