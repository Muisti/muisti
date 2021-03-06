import React, { Component, PropTypes } from 'react';
import { Button, PageHeader, Panel, Col, Fade } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { getTokenPayload } from '../../../util/authStorage';
import { deleteModuleRequest } from '../ModuleActions';
import { connect } from 'react-redux';
import ModulePage from '../pages/ModulePage';
import styles from './ModuleList.css';

/*
 * ModuleListItem is a single module in the list of modules.
 * ModuleListItem is rendered when the user clicks on the header of a panel
 * which is located in ModuleList.js
 */

export class ModuleListItem extends Component {
  constructor(props){
    super(props);
    this.state = { module: this.props.module };
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({ module: nextProps.module });
  };  

  
  modulePageElement = () => {
    return [<Col><ModulePage module={this.state.module} addElementFunctionToMainview={this.props.addElementFunctionToMainview} /></Col>];
  };

  render() {
    return (
      <div>
        <div className={styles.textarea}>{this.props.module.info}</div>
        <Button onClick={()=> this.props.addElementFunctionToMainview(this.modulePageElement)}
        className={ getTokenPayload() ? 'btn btn-default pull-right' : 'hidden' } >
                {this.props.intl.messages.submitGo} &rarr;
        </Button>
      </div>
    );

  }
}

function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}


ModuleListItem.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ModuleListItem);
