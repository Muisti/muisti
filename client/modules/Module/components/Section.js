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
  
    render(){
      var section = this.props.section;
        
      return (
        <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
         <div>{section.content ? section.content : ''}</div>

         {section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : ''}
        </Panel>
      );  
    }
}

Section.propTypes = {
  intl: intlShape.isRequired,  
  section: PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
      link: PropTypes.string 
  })
};

export default injectIntl(Section);