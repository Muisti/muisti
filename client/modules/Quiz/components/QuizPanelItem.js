import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';



export class QuizPanelItem extends Component{
    
    optionCheckboxId = optionIndex => 'quiz' + this.props.quiz.index + 'option' + optionIndex;
    
    renderOption = (option, optionIndex) => {
      return (
        <div style={{marginLeft: '15px', paddingLeft: '10px', background: option.highlight ? '#ddffdd' : 'white'}}>
            <label><input id={this.optionCheckboxId(optionIndex)}
                type="checkbox" style={{marginRight: '6px'}} disabled={option.disabled} />
                    {option.text}
            </label>
        </div>
      );  
    };
    
    
    render(){
      const quiz = this.props.quiz;
      const quizOrderNumber = quiz.index + 1;
      let optionIndex = 0;
      
      return (
        <div style={{marginBottom: '17px'}}>
            <div style={{color: '#5555bb', fontWeight: 'bold', marginBottom: '10px'}}>
                <span style={{marginRight: '9px', background: '#dfdfff', borderRadius: '15px', 
                    padding: '4px', paddingLeft: '9px', paddingRight: '5px', fontSize: '1.15em'}}>
                  {quizOrderNumber + '.'}
                </span>
                {quiz.question}
            </div>
            {quiz.options.map(option => this.renderOption(option, optionIndex++))}
            <div style={{minHeight: '17px'}}>
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
        options: PropTypes.arrayOf({
            text: PropTypes.string.isRequired,
            answer: PropTypes.bool.isRequired
        }).isRequired
    })
};

export default injectIntl(QuizPanelItem);