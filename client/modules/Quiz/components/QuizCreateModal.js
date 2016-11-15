import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, Checkbox, Modal, Form, FormControl, ControlLabel, FieldGroup } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { addQuizRequest } from '../QuizActions';

export class QuizCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, fieldSize: 1 };
  };
  
  clearFields = () => {
    this.state = { showModal: this.state.showModal, fieldSize: 1 };
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };
  
  addField = () => {
    this.setState({ fieldSize: this.state.fieldSize+1 });
  };
  
  removeField = () => {
    if (this.state.fieldSize > 1) {
      var i = this.state.fieldSize;
      this.setState({ [i+'answer']: undefined, [i+'chk']: undefined, fieldSize: i-1 });
    }
  };
  
  handleAddQuiz = () => {
      const sectionCuid = this.props.sectionCuid;
      const question = this.state.formQuestion;
      const options = [];
      for (var i = 1; i-1 < this.state.fieldSize; i++) {
          var text = this.state[i+'answer'];
          if (text) {
            var answer = this.state[i + 'chk'] == true;
            options.push({text, answer});
          }
      }
      if (!sectionCuid || !question || !options || options.length < 1) {
          return;
      }
      this.close();
      this.clearFields();
      addQuizRequest({sectionCuid, question, options});
      
  };
  
  handleQuestionChange = e => {
    this.setState({ formQuestion: e.target.value});
  }
  
  handleCheckboxChange = (number) => e => {
    this.state[number + 'chk'] = e.target.checked;
  }
  
  handleAnswerChange = (number) => e => {
    this.state[number + 'answer'] = e.target.value;
    this.setState({});
  };
  
  optionField = (fieldNumber) => {
      var fields = [];
      for (var i = 1; i-1 < fieldNumber; i++) {
              fields.push(<Form horizontal>
                <ControlLabel> <FormattedMessage id='option' /> {i} </ControlLabel>
                <Checkbox onChange={this.handleCheckboxChange(i)}> <FormattedMessage id='rightAnswer' /> </Checkbox>
                <FormControl type="text" value={this.state[i + 'answer']} onChange={this.handleAnswerChange(i)}
                    placeholder={this.props.intl.messages.option} /> 
              </Form>)
           };
      return (
         <span>
           {fields}
         </span>
      );
  };

  render() {

    return (
      <span>
        <Button onClick={this.open} bsStyle="primary"><FormattedMessage id='addQuiz' /></Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id='addQuizTitle' /></Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <ControlLabel> <FormattedMessage id='question' /> </ControlLabel>
              <FormControl componentClass="textarea" value={this.state.formQuestion} onChange={this.handleQuestionChange}
                    placeholder={this.props.intl.messages.question} />
               
              {this.optionField(this.state.fieldSize)}
              
              <ButtonToolbar>
                <Button onClick={this.addField} bsStyle="danger"> <FormattedMessage id='submitAdd' /> </Button>
                <Button onClick={this.removeField} bsStyle="danger"> <FormattedMessage id='submitRemove' /> </Button>
              </ButtonToolbar>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleAddQuiz}> <FormattedMessage id='submitCreate' /> </Button>
              <Button onClick={() => {this.close(); this.clearFields();}}> <FormattedMessage id='cancel' /> </Button>
            </Modal.Footer>
        </Modal>

      </span>
    );
  }
}

QuizCreateModal.propTypes = {
  sectionCuid: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(QuizCreateModal);