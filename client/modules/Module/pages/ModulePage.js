import React, { PropTypes, Component } from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';

import ModuleListItem from '../components/ModuleListItem/ModuleListItem';

class ModulePage extends Component {

  constructor(){
    super();
  }

  render() {

    return (
      <ModuleListItem />
    );

  }

}

export default ModulePage;
