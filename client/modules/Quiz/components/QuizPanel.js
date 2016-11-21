import React, { Component, PropTypes } from 'react';
import { Panel, Button, ProgressBar } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { sendScoreRequest } from '../QuizActions';
import QuizPanelItem from './QuizPanelItem';

export class QuizPanel extends Component {

  constructor(props){
    super(props);
    this.state = { totalFeedBack: '', totalPercent: -1 };
  }
  
  componentDidMount() {
    this.verifyAnswers();
    console.log(this.props.quizzes);
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

  verifyAnswers = () => {
    let maxPointsTotal = 0;
    let pointsTotal = 0;

    this.props.quizzes.forEach((quiz, i) => {
        
      const maxPoints = this.maxPoints(quiz);
      let points = quiz.points;
      let wrongCount = 0;
      let selectedCount = 0;
      
      if (maxPoints != quiz.points) {
          points = this.countPoints(quiz, this.getUserSelections(quiz, i));
          wrongCount = quiz.options.length - this.correctUserAnswers(quiz, i);
          selectedCount = this.getUserSelections(quiz, i).filter(s => s).length;
          quiz.points = points;
      }
      maxPointsTotal += maxPoints;
      pointsTotal += points;
      quiz.feedback = this.quizFeedback(wrongCount, selectedCount);
      if(wrongCount == 0){
        quiz.options.forEach(option => {
          option.highlight = option.answer;
          option.disabled = true;
        });
      }
    });

    let totalPercent = (pointsTotal / maxPointsTotal) * 100;
    let totalFeedback = 'pisteet: ' + pointsTotal + "/" + maxPointsTotal;

    sendScoreRequest(this.props.quizzes);

    if(this.props.quizzes.length == 1) totalFeedback = '';

    this.setState({ totalFeedback, totalPercent });

  };
  
  calculateQuizIndices = () => {
      let index = 0;
      this.props.quizzes.forEach(quiz => quiz.index = index++);
  }

  renderProgressBar = () => {
    return (
      <div>
        <ProgressBar>
          <ProgressBar now={this.state.totalPercent} bsStyle="success" label={`${Math.round(this.state.totalPercent)}%`} key={1}/>
        </ProgressBar>
      </div>
    );

  };

  render(){
      this.calculateQuizIndices();
      const quizzes = this.props.quizzes;
      
      return (
        <Panel collapsible header={(
                <div className='clearfix'>
                <span style={{cursor: 'pointer', color: '#000066'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Question_Circle.svg?uselang=fi"
                        style={{ verticalAlign: 'bottom', marginRight: '7px' }}/>

                   Tehtävät
                  </span>
                  <span className='pull-right' style={{ color: '#428bca' }}>{this.state.totalFeedback}</span>
                </div>)}>
            {quizzes.map(quiz => <QuizPanelItem quiz={quiz} />)}
            {this.renderProgressBar()}
            <Button onClick={this.verifyAnswers}>Tarkista</Button>
        </Panel>
    );
  }
}


QuizPanel.propTypes = {
    quizzes: PropTypes.array.isRequired,
};

export default injectIntl(QuizPanel);
