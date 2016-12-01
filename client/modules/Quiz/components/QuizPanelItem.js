import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { getTokenPayload } from '../../../util/authStorage';
import { QuizItemOption } from './QuizItemOption';
import styles from './style.css';

export class QuizPanelItem extends Component{

  constructor(props) {
    super(props);
  }

  sendDelete = () => {
    this.props.onDelete(this.props.quiz);
  };
  
  sendEdit = () => {
    this.props.onEdit(this.props.quiz);
  };

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
          <span className={getTokenPayload() && getTokenPayload().isAdmin ? 'pull-right' : 'hidden' }>
            <span className={styles['quiz-action']}>
              <Button bsStyle="link" onClick={this.sendDelete}>Poista kysymys</Button>
              <Button bsStyle="link" onClick={this.sendEdit}>Muokkaa kysymystä</Button>
            </span>
          </span>
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
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  })
};

export default injectIntl(QuizPanelItem);
