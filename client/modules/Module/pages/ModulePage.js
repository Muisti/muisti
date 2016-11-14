import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, PageHeader, Panel, Well } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import SectionCreateModal from '../components/SectionCreateModal/SectionCreateModal';
import SectionFactory from '../components/SectionFactory/SectionFactory'
import ModuleListItem from '../components/ModuleListItem/ModuleListItem';
import QuizItem from '../../Quiz/components/QuizItem';
import { fetchModule } from '../ModuleActions';
import { fetchSections } from '../SectionActions';
import { getTokenPayload } from '../../../util/authStorage';
import validator from 'validator';

class ModulePage extends Component {

  constructor(props){
    super(props);
    this.state = {module: {}, sections: [] };
  }

  componentDidMount() {
    fetchModule(this.props.params.title)
      .then(module => fetchSections(module.cuid)
        .then(sections => {
          if (!sections) sections = [];
          this.setState({sections, module});
        }));
  }

  addSectionToRender = (newSection) => {
    this.setState({sections: [...this.state.sections, newSection]});
  };


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
      return(
        <img src={section.link} width="480" />
        );
    }else{
      return (
        <div> Filetype not supported!</div>
        );
    }
  }
  
  render() {
    return (
      <div>
        <PageHeader> <Button href={"/"}>&larr;<FormattedMessage id={'submitBack'} /></Button> {this.state.module.title}</PageHeader>
        <Well>
          {this.state.module.info}
        </Well>
        
        {this.state.sections.map(section => { if (section) {
            return(
            <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
             <div>{section.content ? section.content : ''}</div>
             
             {section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : ''}
            </Panel>
            );
          }})
        }
        
        <div className={ getTokenPayload() && getTokenPayload().isAdmin ? '' : 'hidden'}>
          <SectionCreateModal moduleCuid={this.state.module.cuid}
                              orderNumber={this.state.sections.length}
                              addSectionToRender={this.addSectionToRender} />
        </div>

        <div className={ getTokenPayload() && getTokenPayload().isAdmin ? '' : 'hidden'}>
          <SectionFactory moduleCuid={this.state.module.cuid} addSectionToRender={this.addSectionToRender}></SectionFactory>
        </div>
      </div>
    );
  }
}

export default ModulePage;
