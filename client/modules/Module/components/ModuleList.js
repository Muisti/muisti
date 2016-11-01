import React, { Component, PropTypes } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import ModuleListItem from './ModuleListItem/ModuleListItem';

import { fetchModules } from '../ModuleActions';

import styles from './ModuleList.css';


class ModuleList extends Component {
  
  constructor(props) {
      super(props);
      this.state = { modules: [] };
  }
  
  componentDidMount() {
    fetchModules().then(modules => this.setState({modules}));
  }
  
  render() {
    var i = 0;
    return (
      
      <Accordion>
        {this.state.modules.map(module => (
            <Panel header={module.title} eventKey={++i}>
              <ModuleListItem module={module}/>
            </Panel>
          ))
        }
      </Accordion>

    );
  }
}


export default ModuleList;
