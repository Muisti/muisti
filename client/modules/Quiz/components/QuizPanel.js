import React, { Component, PropTypes } from 'react';
import { Panel, Button, ProgressBar } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { sendScoreRequest } from '../QuizActions';
import QuizPanelItem from './QuizPanelItem';
import styles from './style.css';

export class QuizPanel extends Component {

  constructor(props){
    super(props);
    this.state = { totalPercent: -1 };
  }

  componentDidMount() {
    this.setPoints();
  }

  countPoints = quiz => {
    if(this.correctAnswers(quiz) == 0){
      return quiz.options.filter(option => option.checked).length ? 0 : 1;
    }else{
      return Math.max(
        quiz.options.reduce((result, option) => 
            (option.checked ? ( option.answer ? +1 : -1 ) : 0) + result
        , 0), 0);
    }
  };

  //helper functions for quizzes
  correctAnswers = quiz => quiz.options.filter(option => option.answer).length;
  maxPoints = quiz => this.correctAnswers(quiz) || 1;
  correctUserAnswers = quiz => quiz.options.filter(option => option.answer == option.checked).length;

  quizFeedback = (wrongAnswers, selected) => {
    const correct = (wrongAnswers == 0);
    const textId = correct ? 'rightAnswerFeedback' : (selected === 0 ? 'selectOption' :
            (wrongAnswers === 1 ? 'oneWrongAnswer' : 'severalWrongAnswers'));
    const color = correct ? 'green' : ( selected ? 'red' : 'gray' );

    return (<span className={styles.quizFeedback + ' ' + styles[color]}>
               <FormattedMessage id={textId} values={{count: wrongAnswers}} />
            </span>);
  };



  setPoints = () => {
    let maxPointsTotal = 0;
    let pointsTotal = 0;

    this.props.quizzes.forEach(quiz => {
      const maxPoints = this.maxPoints(quiz);

      maxPointsTotal += maxPoints;
      pointsTotal += quiz.points;

      if(maxPoints === quiz.points){
        quiz.options.forEach(option => {
          option.highlight = option.answer;
          option.disabled = true;
          option.checked = option.answer;
        });
        quiz.feedback = this.quizFeedback(0);
      }
    });
    let totalPercent = Math.round((pointsTotal / maxPointsTotal) * 100);
    if(isNaN(totalPercent)) totalPercent = 0;
    this.setState({ totalPercent });
  };


  verifyAnswers = () => {
    this.props.quizzes.forEach(quiz => {
      quiz.points = this.countPoints(quiz);
      const wrongCount = quiz.options.length - this.correctUserAnswers(quiz);
      const selectedCount = quiz.options.filter(option => option.checked).length;
      quiz.feedback = this.quizFeedback(wrongCount, selectedCount);
    });
    sendScoreRequest(this.props.quizzes);
    this.setPoints();
  };

  calculateQuizIndices = () => {
      this.props.quizzes.forEach((quiz, index) => quiz.index = index);
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
                <div className='clearfix'><div className={styles.quizPanelHeader}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Question_Circle.svg?uselang=fi"
                        className={styles.quizPanelIcon}/>
                   <FormattedMessage id={'quizPanelTitle'} />
                  <span className={'pull-right '+ styles.quizPanelFeedback}>
                    {this.state.totalPercent + "%"}
                  </span>
                </div></div>)}>
            {quizzes.map((quiz,key) => <QuizPanelItem key={key} quiz={quiz} />)}
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
