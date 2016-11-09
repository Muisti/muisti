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

  

  render() {

    return (

      <div>
       
        <PageHeader> <Button href={"/"} bsStyle="primary">Palaa</Button> {this.state.module.title}</PageHeader>
        <Well>
          {this.state.module.info}
        </Well>
        {this.state.sections.map(section => { if (section) {
          
          if(validator.isURL(section.content)){
            return(
            <Panel collapsible defaultExpanded header={section.title ? section.title : ''} >
             <img src={section.content} />
            </Panel>);

          } else {
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
        
        <SectionFactory moduleCuid={this.state.module.cuid} addSectionToRender={this.addSectionToRender}></SectionFactory>

      </div>
    );
  }
}

export default ModulePage;
