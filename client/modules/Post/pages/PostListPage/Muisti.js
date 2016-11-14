import React, { Component } from 'react';
import { Button, Modal, PageHeader } from 'react-bootstrap';
import { UserCreateModal } from '../../../User/components/UserCreateModal';
import { QuizCreateModal } from '../../../Quiz/components/QuizCreateModal';
import { connect } from 'react-redux';
import * as jwt from 'jwt-simple';

class Muisti extends Component {
    constructor() {
        super();
    }

  render() {
    return (
      <div>
        <PageHeader> Otsikko </PageHeader>
        <Button bsStyle="danger"> Testinappi </Button>
        <Button bsStyle="info"> Testinappi </Button>
        <Button bsStyle="warning"> Testinappi </Button>
        <QuizCreateModal sectionCuid={'123abc'} />

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
