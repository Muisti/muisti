import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export class QuizPanel extends Component{

  constructor(){
      super();
      this.state = { totalFeedBack: '' };
  }

  getUserSelections = (quiz, quizIndex) => {
    let result = [];
    for(let i = 0; i < quiz.options.length; i++){
      const checked = document.getElementById(this.optionCheckboxId(quizIndex, i)).checked;
      result.push(checked);
    }
    
    return result;
  };
  
  countPoints = (quiz, userAnswers) => {
    if(this.correctAnswers(quiz) == 0){
        return userAnswers.filter(answer => answer).length ? 0 : 1;
    }
    let result = 0;
    for(let i = 0; i < quiz.options.length; i++){
        if(userAnswers[i] === quiz.options[i].answer){
            if(quiz.options[i].answer) result++;
        }else{
            if(!quiz.options[i].answer) result--;
        }
    }
    
    return Math.max(result, 0);
  };
  
  //helper functions for quizzes
  optionCheckboxId = (quizIndex, optionIndex) => 'quiz' + quizIndex + 'option' + optionIndex;
  correctAnswers = quiz => quiz.options.filter(option => option.answer).length;
  maxPoints = quiz => this.correctAnswers(quiz) || 1;
  show = condition => (condition ? {} : { display: 'none' });
  
  verifyAnswers = (userAnswers) => {
      let maxPointsTotal = 0;
      let pointsTotal = 0;
      
      this.props.quizzes.forEach((quiz, i) => {
         const points = this.countPoints(quiz, this.getUserSelections(quiz, i));
         const maxPoints = this.maxPoints(quiz);
         
         maxPointsTotal += maxPoints;
         pointsTotal += points;
         console.log(points + " / " + this.maxPoints(quiz));
      });
      
      this.setState({ totalFeedback: 'pisteet: ' + pointsTotal + " / " + maxPointsTotal });
  };
  
  renderQuiz = (quiz, quizIndex) => {
      const quizOrderNumber = quizIndex + 1;
      let optionIndex = 0;
      
      return (
        <div style={{marginBottom: '17px'}}>
        <div style={{color: '#5555bb', fontWeight: 'bold', marginBottom: '10px'}}>
        <span style={{marginRight: '9px', background: '#dfdfff', borderRadius: '15px', 
            padding: '4px', paddingLeft: '9px', paddingRight: '5px', fontSize: '1.15em'}}>
          {quizOrderNumber + '.'}
        </span>
        {quiz.question}</div>
          {quiz.options.map(option => (
            <div style={{marginLeft: '25px'}}>
            <label><input id={this.optionCheckboxId(quizIndex, optionIndex++)}
                type="checkbox" style={{marginRight: '6px'}} />{option.text}</label>
            </div>
          ))}
        <div style={{...this.show(quiz.feedback)}}>
            {quiz.feedback}
        </div>
        </div>
      );
  };
  
  render(){
      let quizIndex = 0;
      const quizzes = this.props.quizzes;
      
      return (
        <Panel collapsible header={(
                <div className='clearfix'>
                <div style={{cursor: 'pointer'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Question_Circle.svg?uselang=fi" 
                        style={{ verticalAlign: 'bottom' }}/>
                <span style={{marginLeft: '7px', color: '#000066'}}>
                   Tehtävät
                </span>
                </div>
                </div>)}>
            {quizzes.map(quiz => this.renderQuiz(quiz, quizIndex++))}
            <div>{this.state.totalFeedback}</div>
            <Button onClick={this.verifyAnswers}>Tarkista</Button>
        </Panel>
    );
  }
}


QuizPanel.propTypes = {
    quizzes: PropTypes.arrayOf({
        cuid: PropTypes.string,
        question: PropTypes.string,
        options: PropTypes.arrayOf({
            text: PropTypes.string.isRequired,
            answer: PropTypes.bool.isRequired
        }).isRequired
    })
  };

export default injectIntl(QuizPanel);