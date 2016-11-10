import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, PageHeader, Panel, Well } from 'react-bootstrap';

import SectionCreateModal from '../components/SectionCreateModal/SectionCreateModal';
import SectionFactory from '../components/SectionFactory/SectionFactory'
import ModuleListItem from '../components/ModuleListItem/ModuleListItem';
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

  checkMultimediaFileType = function(link) {
    if(validator.contains(link, ".webm") || validator.contains(link, ".mp4") || validator.contains(link, ".ogg"))
      return "video";
    if(validator.contains(link, ".jpg") || validator.contains(link, ".jpeg") || validator.contains(link, ".gif"))
      return "image";
    else
      return "error"; 
  };

  FileTypeRender = (type) => {
    if(type === "video")
     return; 

  }

  render() {

    return (

      <div>
       
        <PageHeader> <Button href={"/"} bsStyle="primary">Palaa</Button> {this.state.module.title}</PageHeader>
        <Well>
          {this.state.module.info}
        </Well>
        {this.state.sections.map(section => { if (section) {
          
          if(this.checkMultimediaFileType(section.content) === "video"){
            return(
            <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
             <video width="320" height="240" controls>
              <source src={section.content} type="video/webm" />
             </video> 
            </Panel>);

          }else if(this.checkMultimediaFileType(section.content) === "image"){
            return(
            <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
             <video width="320" height="240" controls>
              <source src={section.content} type="video/webm" />
             </video> 
            </Panel>);

          }else {
          return(
            <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
             {section.content}
            </Panel>);
          }
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
