/**
 * Created by susisusi on 12/09/16.
 */
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UserCreateModal } from '../../../User/components/UserCreateModal';
import { connect } from 'react-redux';

class Muisti extends Component {
    constructor() {
        super();
    }


  render() {
    return (
      <div>
        <Button bsStyle="danger"> Testinappi </Button>
        <UserCreateModal />
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
