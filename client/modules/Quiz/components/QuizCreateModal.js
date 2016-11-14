import React, { Component, PropTypes } from 'react';
import { Button, Checkbox, Modal, Form, FormControl, ControlLabel, FieldGroup } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export class QuizCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.state = { fieldSize: 1 };
  }

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
      this.setState({ fieldSize: this.state.fieldSize-1 });
    }
  };
  
  createQuiz = () => {
      
  }
  
  //sectionCuid, question, options
  addQuizRequest = () => {
      var quiz = this.createQuiz();
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
                <ControlLabel> Vaihtoehto {i} </ControlLabel>
                <Checkbox onChange={this.handleCheckboxChange(i)}> Oikea vastaus </Checkbox>
                <FormControl type="text" value={this.state[i + 'answer']} onChange={this.handleAnswerChange(i)}
                    placeholder='Kissa sanoo mau: ' /> 
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
        <Button onClick={this.open} bsStyle="primary">QUIZ CREATE</Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title>OTSIKKO</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <ControlLabel> Kysymys </ControlLabel>
              <FormControl componentClass="textarea" value={this.state.formQuestion} onChange={this.handleQuestionChange}
                    placeholder='Kysymys' />
               
            {this.optionField(this.state.fieldSize)}
              
              <Button onClick={this.addField} bsStyle="danger"> MORE </Button>
                {' '}
              <Button onClick={this.removeField} bsStyle="danger"> LESS </Button>
           
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.addQuizRequest}> VALMIS </Button>
              <Button onClick={this.close}> CANCEL </Button>
             </Modal.Footer>
        </Modal>

      </span>
    );
  }
}
//sectionCuid, question, options
QuizCreateModal.propTypes = {
  sectionCuid: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(QuizCreateModal);