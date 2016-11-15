import React, { Component, PropTypes } from 'react';
import { Panel, Button, ProgressBar } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export class QuizPanel extends Component{

  constructor(){
      super();
      this.state = { totalFeedBack: '', totalProsent: -1 };
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
      let style = { borderRadius: '15px', color: '#aaaaaa', 
          fontWeight: 'bold',   display: 'inline-block', padding: '2px' };
      if(correct){
          style = {...style, color: '#005500', background: '#ddffdd'};
      }
      if(!correct && selected) style = {...style, color: '#dd8866'};

      return (<div style={style}>{text}</div>);
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
             });
         }
      });
      let totalProsent = (pointsTotal / maxPointsTotal) * 100;
      let totalFeedback = 'pisteet: ' + pointsTotal + "/" + maxPointsTotal;
      if(this.props.quizzes.length == 1) totalFeedback = '';
      
      this.setState({ totalFeedback, totalProsent });
      
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
                type="checkbox" style={{marginRight: '6px'}} />
                        {option.text}
                </label>
            </div>
          ))}
        <div>
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
                <div style={{cursor: 'pointer', color: '#000066'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Question_Circle.svg?uselang=fi" 
                        style={{ verticalAlign: 'bottom', marginRight: '7px' }}/>
                
                   Tehtävät <span style={{align:'right'}}>{this.state.totalFeedback}</span>
                
                </div>
                </div>)}>
            {quizzes.map(quiz => this.renderQuiz(quiz, quizIndex++))}
            <div>
            <ProgressBar style={this.show(this.state.totalProsent != -1)}>
              <ProgressBar now={this.state.totalProsent} bsStyle="success" label={`${this.state.totalProsent}%`} key={1}/>
              <ProgressBar now={100 - this.state.totalProsent} bsStyle="danger" key={2}/>
            </ProgressBar>
           
            </div>
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