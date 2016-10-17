import React, { PropTypes } from 'react';
import { Accordion, Panel, Button, Grid, Row, Col } from 'react-bootstrap';

import ModuleListItem from './ModuleListItem/ModuleListItem';

import styles from './ModuleList.css';


function ModuleList() {

  var headerStyle = (
    <div className="clearfix">
      <div className={styles['panel-heading']}>
        Moduulin otsikko
      </div>
    </div>
  );

  return (

    <Accordion>
      <Panel header={headerStyle} eventKey="1">
        Ensimmäinen moduuli <br />
        Moduulin esittely lyhyesti
        <a href="/module" className="btn btn-default pull-right" >Siirry</a>
      </Panel>
      <Panel header={headerStyle} eventKey="2">
        Toinen moduuli <br />
        Moduulin esittely lyhyesti
        <a href="/module" className="btn btn-default pull-right" >Siirry</a>
      </Panel>
      <Panel header={headerStyle} eventKey="3">
        Kolmas moduuli <br />
        Moduulin esittely lyhyesti
        <a href="/module" className="btn btn-default pull-right" >Siirry</a>
      </Panel>
      <Panel header={headerStyle} eventKey="4">
        Neljäs moduuli <br />
        Moduulin esittely lyhyesti
        <a href="/module" className="btn btn-default pull-right" >Siirry</a>
      </Panel>
      <Panel header={headerStyle} eventKey="5">
        Viides moduuli <br />
        Moduulin esittely lyhyesti
        <a href="/module" className="btn btn-default pull-right" >Siirry</a>
      </Panel>
    </Accordion>

  );
}


export default ModuleList;
