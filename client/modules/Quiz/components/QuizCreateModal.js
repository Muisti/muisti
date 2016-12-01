import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, Checkbox, Modal, Form, FormControl, ControlLabel, FieldGroup } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { addQuizRequest } from '../QuizActions';

export class QuizCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = { fieldSize: 1 };
    this.previousShow = false;
  };
  
  setQuiz = () => {
    const quiz = this.props.quiz;
    const optionCount = quiz.options.length;
    this.state = { fieldSize: optionCount, formQuestion: quiz.question };
    quiz.options.forEach((option, i) => {
        this.state[(i+1) + "answer"] = option.text;
        this.state[(i+1) + "chk"] = option.answer;
    });
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
  
  handleSaveQuiz = () => {
      const question = this.state.formQuestion;
      const options = [];
      
      for (var i = 1; i-1 < this.state.fieldSize; i++) {
          var text = this.state[i+'answer'];
          if (text) {
            var answer = this.state[i + 'chk'] == true;
            options.push({text, answer});
          }
      }
      
      if (!question || !options || options.length < 1) {
          return;
      }
      
      this.props.save({question, options});
  };
  
  handleQuestionChange = e => {
    this.setState({ formQuestion: e.target.value});
  }
  
  handleCheckboxChange = (number) => e => {
    this.setState({[number + 'chk']: e.target.checked});
  }
  
  handleAnswerChange = (number) => e => {
    this.state[number + 'answer'] = e.target.value;
    this.setState({});
  };
  
  optionField = (fieldNumber) => {
      var fields = [];
      for (var i = 1; i-1 < fieldNumber; i++) {
              fields.push(<Form horizontal key={i}>
                <ControlLabel> <FormattedMessage id='option' /> {i} </ControlLabel>
                <Checkbox checked={this.state[i + 'chk']} onChange={this.handleCheckboxChange(i)}>
                    <FormattedMessage id='rightAnswer' /> 
                </Checkbox>
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
    if(!this.previousShow && this.props.show){ this.setQuiz(); } 
    this.previousShow = this.props.show;
    const isNewQuiz = !this.props.quiz.cuid;

    return (
        <Modal show={this.props.show} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id={isNewQuiz ? 'addQuizTitle' : 'editQuizTitle'} /></Modal.Title>
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
              <Button onClick={this.handleSaveQuiz}> 
                  <FormattedMessage id={isNewQuiz ? 'submitCreate' : 'submitEdit'} /> 
              </Button>
              <Button onClick={this.props.cancel}> <FormattedMessage id='cancel' /> </Button>
            </Modal.Footer>
        </Modal>
    );
  }
}

QuizCreateModal.propTypes = {
  quiz: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default injectIntl(QuizCreateModal);