import React, { Component, PropTypes } from 'react';
import { PageHeader, Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import validator from 'validator';
import QuizPanel from '../../Quiz/components/QuizPanel';
import QuizCreateModal from '../../Quiz/components/QuizCreateModal';
import { getTokenPayload } from '../../../util/authStorage';

export class Section extends Component{
    
  checkMultimediaFileType = (link) => {
    if(validator.contains(link, ".webm") || validator.contains(link, ".mp4") || validator.contains(link, ".ogg"))
      return "video";
    if(validator.contains(link, ".jpg") || validator.contains(link, ".jpeg") || validator.contains(link, ".gif"))
      return "image";
    if(validator.contains(link, "youtube.com") || validator.contains(link, "youtu.be"))
      return "youtube";
    else
      return "error"; 
  };

  renderMultimediaFileType = (type, section) => {
    if (type === "video") {
      return(
        <video width="640"  controls>
            <source src={section.link} type="video/webm" />
        </video> 
        );
    } else if (type === "image") {
      return( <img src={section.link} width="480" /> );
    } else if (type === "youtube") {
        //Parseroi v= linkistä.
        var re = /(v=|embed\/|tu.be\/)(\w+)/g;
        var v = re.exec(section.link);
        var link = "https://www.youtube.com/embed/";
        link += v[2];
        return (<iframe width="560" height="315" 
          src={link}
          frameBorder="0" allowFullScreen></iframe> );
    } else {
      return ( <div> Filetype not supported!</div> );
    }

  }
  
  addQuiz = (quiz) => { this.props.section.quizzes.push(quiz); this.setState({}); }

  render(){
    var section = this.props.section;
    const token = getTokenPayload();
        
      return (
        <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
         <div>{section.content ? section.content : ''}</div>

         {section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : ''}
         
         <div style={!section.quizzes || section.quizzes.length == 0 ? {display: 'none'} : {}}>
            <br />
            <QuizPanel quizzes={section.quizzes} />
         </div>
         <div style={token && token.isAdmin ? {} : {display : 'none'}}>
            <QuizCreateModal addQuiz={this.addQuiz} sectionCuid={section.cuid} />
         </div>
        </Panel>
      );  
    }
}

Section.propTypes = {
  intl: intlShape.isRequired,  
  section: PropTypes.shape({
      cuid: PropTypes.string,
      content: PropTypes.string,
      title: PropTypes.string,
      link: PropTypes.string,
      quizzes: PropTypes.array
  }),
};

export default injectIntl(Section);