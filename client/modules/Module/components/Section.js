import React, { Component, PropTypes } from 'react';
import { PageHeader, Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import validator from 'validator';

export class Section extends Component{
    
  checkMultimediaFileType = (link) => {
    if(validator.contains(link, ".webm") || validator.contains(link, ".mp4") || validator.contains(link, ".ogg"))
      return "video";
    if(validator.contains(link, ".jpg") || validator.contains(link, ".jpeg") || validator.contains(link, ".gif"))
      return "image";
    else
      return "error"; 
  };

  renderMultimediaFileType = (type, section) => {
    if(type === "video"){
      return(
        <video width="640"  controls>
        <source src={section.link} type="video/webm" />
        </video> 
        );
    }else if (type === "image"){
      return( <img src={section.link} width="480" /> );
    }else{
      return ( <div> Filetype not supported!</div> );
    }

  }
  
  renderQuiz = (quiz, number) => {
      var optionNumber = 0;
      
      return (
        <div style={{marginBottom: '15px'}}>
        <div style={{color: '#5555bb', fontWeight: 'bold', marginBottom: '10px'}}>
        <span style={{marginRight: '9px', background: '#dfdfff', borderRadius: '15px', 
            padding: '4px', paddingLeft: '9px', paddingRight: '5px', fontSize: '1.15em'}}>
          {number + '.'}
        </span>
        {quiz.question}</div>
          {quiz.options.map(option => (
            <div style={{marginLeft: '25px'}}>
            <label><input id={'quiz' + (number-1) + 'option' + optionNumber++}
                type="checkbox" style={{marginRight: '6px'}} />{option.text}</label>
            </div>
          ))}
        </div>
      );
  }
  
  getUserSelections = (quiz, index) => {
    var result = [];

    for(var i = 0; i < quiz.options.length; i++){
      var checked = document.getElementById('quiz' + index + 'option' + i).checked;
      result.push(checked);
    }
    
    return result;
  };
  
    render(){
      var section = this.props.section;
      var quizOrderNumber = 0;
      section.quizzes = [{question: 'mikä eläin sanoo "Hau Hau" ?', options: [
        {text: 'kissa'}, {text: 'koira'}, {text: 'kukko'}
      ]}, {question: 'mikä eläin sanoo "Mau Mau" ?', options: [
        {text: 'kissa'}, {text: 'koira'}, {text: 'kukko'}
      ]}];
        
      return (
        <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
         <div>{section.content ? section.content : ''}</div>

         {section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : ''}
         
         <div style={!section.quizzes || section.quizzes.length == 0 ? {display: 'none'} : {}}>
            <br />
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
            {section.quizzes.map(quiz => this.renderQuiz(quiz, ++quizOrderNumber))}
            </Panel>
            <Button onClick={() => console.log(this.getUserSelections(section.quizzes[0], 0))}>tarkista</Button>
         </div>
        </Panel>
      );  
    }
}

Section.propTypes = {
  intl: intlShape.isRequired,  
  section: PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
      link: PropTypes.string,
      quizzes: PropTypes.arrayOf({
          question: PropTypes.string,
          options: PropTypes.arrayOf({
              text: PropTypes.string,
              answer: PropTypes.bool
          })
      }),
  })
};

export default injectIntl(Section);