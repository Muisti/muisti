import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap';

import SectionCreateModal from '../components/SectionCreateModal/SectionCreateModal';

import ModuleListItem from '../components/ModuleListItem/ModuleListItem';
import { fetchModule, fetchSections } from '../ModuleActions';


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


  render() {

    return (
      
      <div>
      <PageHeader>Moduulin sisältö</PageHeader>

      <Panel header={this.state.module.title} eventKey="1">
        <br />
        {this.state.module.info}
        <br />

      </Panel>  
       {this.state.sections.map(section => (
            <Panel collapsible defaultExpanded header={section.title} >
              {section.content}
            </Panel>
          ))
        }
      
      <SectionCreateModal moduleCuid={"ciuz9fahl0001nlkrgh7rqz80"} orderNumber={1} />

      </div>


    );

  }

}





export default ModulePage;
