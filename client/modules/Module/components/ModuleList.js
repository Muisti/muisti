import React, { Component, PropTypes } from 'react';
import { Accordion, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ModuleListItem from './ModuleListItem/ModuleListItem';

import { fetchModules, addModuleRequest } from '../ModuleActions';

import styles from './ModuleList.css';

class ModuleList extends Component {
  
  constructor(props) {
      super(props);
      this.state = { modules: [], formTitle: '', formInfo: '' };
  }
  
  componentDidMount() {
    fetchModules().then(modules => this.setState({modules}));
  }
  
  handleTitleChange = (e) => {
    this.setState({ formTitle: e.target.value });
  }
  
  handleInfoChange = (e) => {
    this.setState({ formInfo: e.target.value });
  }
  
  handleAddModule = () => {
    if (!this.state.formInfo || !this.state.formTitle) {
      return;
    }
    addModuleRequest({ title: this.state.formTitle, 
                       info: this.state.formInfo, 
                       orderNumber: this.state.modules[this.state.modules.length-1].orderNumber+1 })
            .then(module => this.setState({ modules: [...this.state.modules, module] }));
  }
  
  handleEditModule = () => {
      
  }
  
  handleDeleteModule = () => {
      
  }
  
  render() {
    var i = 0;
    return (
      
      <Accordion>
        {this.state.modules.map(module => (
            <Panel header={module.title} eventKey={++i} key={i}>
              <ModuleListItem module={module}/>
            </Panel>
          ))
        }
        <Panel header="Moduulin lisäys" eventKey={++i}>
          <FormGroup>
            <ControlLabel> Otsikko </ControlLabel>
            <FormControl type="text" value={this.state.formTitle} onChange={this.handleTitleChange} placeholder="Otsikko" />
            <ControlLabel> Kuvaus </ControlLabel>
            <FormControl componentClass="textarea" value={this.state.fromInfo} onChange={this.handleInfoChange} placeholder="Kuvaus" />
            <Button type="submit" onClick={this.handleAddModule}> Luo uusi! </Button>
          </FormGroup>
        </Panel>
      </Accordion>

    );
  }
}


export default ModuleList;
