import React, { PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';

function ModuleListItem(props) {
  var toAddress = encodeURI(props.module.title);
  console.log(toAddress);
  return (
    <div>
      {props.module.content}
      <a href={"/module/" + toAddress} className="btn btn-default pull-right" >Siirry</a>
    </div>
  );
}

ModuleListItem.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  placing: PropTypes.number.isRequired,
};

export default ModuleListItem;
