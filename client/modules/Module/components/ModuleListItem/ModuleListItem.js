import React, { PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { getTokenPayload } from '../../../../util/authStorage';

import ModulePage from '../../pages/ModulePage'

function ModuleListItem(props) {
  var toAddress = encodeURI(props.module.title);
  
  return (
    <div>
      {props.module.info}
      <a href={"/module/" + toAddress} 
      className={ getTokenPayload() ? 'btn btn-default pull-right' : 'hidden' } >
              <FormattedMessage id={'submitGo'} />
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
