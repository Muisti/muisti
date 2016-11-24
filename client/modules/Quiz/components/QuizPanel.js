import React, { Component, PropTypes } from 'react';
import { Panel, Button, ProgressBar } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { sendScoreRequest } from '../QuizActions';
import QuizPanelItem from './QuizPanelItem';

export class QuizPanel extends Component {

  constructor(props){
    super(props);
    this.state = { totalPercent: -1 };
  }

  componentDidMount() {
    this.setPoints();
  }


  getUserSelections = (quiz, quizIndex) => {
    let result = [];
    quiz.options.forEach((option, i) => {
      const checked = option.checked ? true : false ;
      result.push(checked);
    })

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
  correctAnswers = quiz => quiz.options.filter(option => option.answer).length;
  maxPoints = quiz => this.correctAnswers(quiz) || 1;
  show = condition => (condition ? {} : { display: 'none' });

  quizFeedback = (wrongAnswers, selected) => {
    const correct = (wrongAnswers == 0);
    let text = correct ? <FormattedMessage id={'rightAnswerFeedback'} /> : (wrongAnswers == 1 ? <FormattedMessage id={'oneWrongAnswer'} /> :
    <FormattedMessage id={'severalWrongAnswers'} values={{count: wrongAnswers}} />);
    if(selected == 0 && !correct) text = <FormattedMessage id={'selectOption'} />;
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

  setPoints = () => {
    let maxPointsTotal = 0;
    let pointsTotal = 0;

    this.props.quizzes.forEach((quiz, i) => {
      const maxPoints = this.maxPoints(quiz);
        
      maxPointsTotal += maxPoints;
      pointsTotal += quiz.points;

      if(maxPoints === quiz.points){
        quiz.options.forEach((option, j) => {
          option.highlight = option.answer;
          option.disabled = true;
          option.checked = option.answer;
        });
        quiz.feedback = this.quizFeedback(0);
      }
    });
    let totalPercent = Math.round((pointsTotal / maxPointsTotal) * 100);
    this.setState({ totalPercent });
  };


  verifyAnswers = (quiz, i) => {
    this.props.quizzes.forEach((quiz, i) => {
      quiz.points = this.countPoints(quiz, this.getUserSelections(quiz, i));
      const wrongCount = quiz.options.length - this.correctUserAnswers(quiz, i);
      const selectedCount = this.getUserSelections(quiz, i).filter(s => s).length;
      quiz.feedback = this.quizFeedback(wrongCount, selectedCount);
    });
    sendScoreRequest(this.props.quizzes);
    this.setPoints();
  };

  calculateQuizIndices = () => {
      let index = 0;
      this.props.quizzes.forEach(quiz => quiz.index = index++);
  };

  renderProgressBar = () => {
    return (
      <div>
        <ProgressBar>
          <ProgressBar now={this.state.totalPercent} bsStyle="success" label={this.state.totalPercent + "%"} key={1}/>
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
                   <FormattedMessage id={'quizPanelTitle'} />
                  </span>
                  <span className='pull-right' style={{ color: '#428bca' }}>{this.state.totalPercent + "%"}</span>
                </div>)}>
            {quizzes.map(quiz => <QuizPanelItem quiz={quiz} />)}
            {this.renderProgressBar()}
            <Button onClick={this.verifyAnswers}><FormattedMessage id={'check'} /></Button>
        </Panel>
    );
  }
}


QuizPanel.propTypes = {
    quizzes: PropTypes.array.isRequired,
};

export default injectIntl(QuizPanel);
