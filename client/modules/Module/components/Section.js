import React, { Component, PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
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
  
  renderQuiz = quiz => {
      return (
        <div>
        <div style={{color: '#5555bb', fontWeight: 'bold', marginBottom: '10px'}}>
        <span style={{marginRight: '8px'}}>
            1.
        </span>
        {quiz.question}</div>
          {quiz.answers.map(answer => (
            <div style={{marginLeft: '25px'}}>
            <label><input type="checkbox" style={{marginRight: '6px'}} />{answer}</label>
            </div>
          ))}
        </div>
      );
  }
  
    render(){
      var section = this.props.section;
        
      return (
        <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
         <div>{section.content ? section.content : ''}</div>

         {section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : ''}
         
         <div show={true}>
         <br />
         <Panel collapsible header={(
             <div className='clearfix'>
             <div style={{cursor: 'pointer'}}>
                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Question_Circle.svg?uselang=fi" />
             <span style={{marginLeft: '7px', color: '#000066'}}>
                Tehtävät
             </span>
             </div>
             </div>)}>
         {this.renderQuiz({question: "Mikä eläin sanoo 'hau hau'?", 
                 answers: ['koira', 'kissa', 'kukko']})}
         </Panel>
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
  })
};

export default injectIntl(Section);