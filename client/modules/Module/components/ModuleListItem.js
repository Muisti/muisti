import React, { PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { getTokenPayload } from '../../../util/authStorage';
import { deleteModuleRequest } from '../ModuleActions';
import ModulePage from '../pages/ModulePage';
import styles from './ModuleList.css';

/*
 * ModuleListItem is a single module in the list of modules.
 * ModuleListItem is rendered when the user clicks on the header of a panel
 * which is located in ModuleList.js
 */

function ModuleListItem(props) {
  var toAddress = encodeURI(props.module.title);
  //Take the last 3 symbols of cuid and add them to the link.
  toAddress += '-' + props.module.cuid.slice(-3);
  return (
    <div>
      <div className={styles.textarea}>{props.module.info}</div>
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
