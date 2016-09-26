import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button, Modal } from 'react-bootstrap';

export class UserCreateModal extends Component {

    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }
    
  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {

    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}
        >
          Launch demo modal
        </Button>
        
        <Modal show={this.state.showModal} onHide={this.close}>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </Modal>
      </div>
    );
  }
  
}

UserCreateModal.propTypes = {
      
};

export default UserCreateModal;