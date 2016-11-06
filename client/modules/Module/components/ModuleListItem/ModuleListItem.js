import React, { PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import ModulePage from '../../pages/ModulePage'
function ModuleListItem(props) {
  var toAddress = encodeURI(props.module.title);
  
  return (
    <div>
      {props.module.info}
      <a href={"/module/" + toAddress} className="btn btn-default pull-right" >Siirry</a>
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
