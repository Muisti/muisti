import React, { PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';

function ModuleListItem(props) {

  return (
    <div>
      {props.module.info}
      <a href="/module" className="btn btn-default pull-right" >Siirry</a>
    </div>
  );
}

ModuleListItem.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModuleListItem;
