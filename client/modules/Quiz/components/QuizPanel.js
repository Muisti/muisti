import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { sendScoreRequest } from '../QuizActions';


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
  
  quizFeedback = (wrongAnswers, selected) => {
      const correct = (wrongAnswers == 0);
      let text = correct ? 'Oikein!' : (wrongAnswers == 1 ? 'Yksi valinta väärin!' : 
              'Vääriä valintoja: ' + wrongAnswers + "!");
      if(selected == 0 && !correct) text = 'Valitse vähintään yksi vaihtoehto.';
      let style = { color: '#aaaaaa', fontWeight: 'bold',   display: 'inline-block'};
      if(correct) style = {...style, color: '#005500'};
      if(!correct && selected) style = {...style, color: '#dd8866'};

      return (<span style={style}>{text}</span>);
  };
  
  correctUserAnswers = (quiz, quizIndex) => {
      const userAnswers = this.getUserSelections(quiz, quizIndex);
      let result = 0;
      
      for(let i = 0; i < userAnswers.length; i++){
          if(userAnswers[i] == quiz.options[i].answer){
              result++;
          }
      }
      
      return result;
  };
  
  verifyAnswers = (userAnswers) => {
      let maxPointsTotal = 0;
      let pointsTotal = 0;
      
      this.props.quizzes.forEach((quiz, i) => {
         const points = this.countPoints(quiz, this.getUserSelections(quiz, i));
         const maxPoints = this.maxPoints(quiz);
         
         maxPointsTotal += maxPoints;
         pointsTotal += points;
         const wrongCount = quiz.options.length - this.correctUserAnswers(quiz, i);
         const selectedCount = this.getUserSelections(quiz, i).filter(s => s).length;
         quiz.feedback = this.quizFeedback(wrongCount, selectedCount);
         if(wrongCount == 0){
             quiz.options.forEach(option => {
                option.highlight = option.answer;
                option.disabled = true;
             });
         }
         
         quiz.points = points;
      });
      
      sendScoreRequest(this.props.quizzes);
      
      let totalFeedback = 'pisteet: ' + pointsTotal + " / " + maxPointsTotal;
      if(this.props.quizzes.length == 1) totalFeedback = '';
      this.setState({ totalFeedback });
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
            <div style={{marginLeft: '15px', paddingLeft: '10px', background: option.highlight ? '#ddffdd' : 'white'}}>
            <label><input id={this.optionCheckboxId(quizIndex, optionIndex++)}
                type="checkbox" style={{marginRight: '6px'}} disabled={option.disabled} />
                        {option.text}
                </label>
            </div>
          ))}
        <div style={{minHeight: '17px'}}>
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
        }).isRequired,
        points: PropTypes.number,
    })
  };

export default injectIntl(QuizPanel);