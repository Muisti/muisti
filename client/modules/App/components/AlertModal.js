
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Modal, Button } from 'react-bootstrap';

export class AlertModal extends Component{
    constructor(props){
        super(props);
        this.state = { closed: false };
    }
    
    close = () => this.setState({ closed: true });
    
    render() {
      return (
        <Modal show={this.props.message && !this.state.closed}>
            <Modal.Body>
                {this.props.message}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close}>Ok</Button>
            </Modal.Footer>
        </Modal>
      );
    };
}


AlertModal.propTypes = {
    message: PropTypes.string
};

export default AlertModal;