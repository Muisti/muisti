import React, { PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { getTokenPayload } from '../../../util/authStorage';
import { deleteModuleRequest } from '../ModuleActions';
import ModulePage from '../pages/ModulePage'




function ModuleListItem(props) {
  var toAddress = encodeURI(props.module.title);
  
this.deleteModule = () => {
  deleteModuleRequest(props.module.cuid);
};
  
  return (
    <div>
      {props.module.info}
      <Button bsStyle="danger" className={ getTokenPayload() && getTokenPayload().isAdmin ? '' : 'hidden' } onClick={this.deleteModule}>
        Delete Module
      </Button>
      <a href={"/module/" + toAddress} 
      className={ getTokenPayload() ? 'btn btn-default pull-right' : 'hidden' } >
              <FormattedMessage id={'submitGo'} />&rarr;
      </a>
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
