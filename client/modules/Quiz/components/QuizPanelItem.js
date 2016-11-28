import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from './style.css';

import { QuizItemOption } from './QuizItemOption';

export class QuizPanelItem extends Component{

  constructor(props) {
    super(props);
  }

  render(){
    const quiz = this.props.quiz;
    const quizOrderNumber = quiz.index + 1;

    return (
      <div className={styles.quizItem}>
        <div className={styles.questionText}>
          <span className={styles.quizOrderNumber}>
            {quizOrderNumber + '.'}
          </span>
          {quiz.question}
        </div>
        {quiz.options.map((option, i) =>
          <QuizItemOption option={option} key={i}/>)}
        <div className={styles.quizFeedbackSpace}>
          {quiz.feedback}
        </div>
      </div>
    );
  }
}

QuizPanelItem.propTypes = {
  quiz: PropTypes.shape({
    cuid: PropTypes.string,
    index: PropTypes.number,
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      answer: PropTypes.bool.isRequired,
      checked: PropTypes.bool,
    })).isRequired,
  })
};

export default injectIntl(QuizPanelItem);
