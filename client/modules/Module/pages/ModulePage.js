import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, PageHeader, Panel, Well } from 'react-bootstrap';

import SectionCreateModal from '../components/SectionCreateModal/SectionCreateModal';

import ModuleListItem from '../components/ModuleListItem/ModuleListItem';
import { fetchModule, fetchSections } from '../ModuleActions';
import { getTokenPayload } from '../../../util/authStorage';

class ModulePage extends Component {

  constructor(props){
    super(props);
    this.state = {module: {}, sections: [] };
  }
  
  componentDidMount() {
    
    fetchModule(this.props.params.title)
      .then(module => fetchSections(module.cuid)
        .then(sections => this.setState({sections, module})));
  
  }

  addSectionToRender = (newSection) => {
    this.setState({sections: [...this.state.sections, newSection]});
  }

  render() {
    
    return (
      
      <div>
      <PageHeader>{this.state.module.title}</PageHeader>
      <Well>
        {this.state.module.info}
      </Well>
      {this.state.sections.map(section => (
            <Panel collapsible defaultExpanded header={section.title} >
              {section.content}
            </Panel>
          ))
      }
      <div className={ getTokenPayload() && getTokenPayload().isAdmin ? '' : 'hidden'}>
        <SectionCreateModal moduleCuid={this.state.module.cuid} orderNumber={this.state.sections.length} addSectionToRender={this.addSectionToRender} />
      </div>
      
      </div>


    );

  }

}





export default ModulePage;
