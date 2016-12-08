
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Modal, Button, Alert } from 'react-bootstrap';


/* This is general component for showing alert messages to user through modal.
 * Message content is received through message-prop. 
 * Modal is hided until message is non-null. Message can be plain text or jsx.
 * User can close modal by clickin "Ok"-button in modals footer.
 * 
 * basicAlert and errorAlert are helper methods to construct jsx-message with
 * title and clearly visible text content. 
*/

export class AlertModal extends Component{
    constructor(props){
        super(props);
        this.state = { closed: false, oldMessage: null };
    }
    
    close = () => this.setState({ closed: true });
    
    update = () =>  {
        if(this.props.message != this.state.oldMessage){
            this.state = { closed: false, oldMessage: this.props.message };
        }
    };

    render() {
      this.update();  
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

export function basicAlert(title, message){
    return (<div><h2>{title}</h2><br/><h4>{message}</h4></div>);
}

export function errorAlert(title, message){
    return (<Alert bsStyle="danger"><h3>{title}</h3>{message}</Alert>);
}

AlertModal.propTypes = {
    message: PropTypes.object
};

export default AlertModal;