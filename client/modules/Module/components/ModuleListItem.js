import React, { Component, PropTypes } from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { getTokenPayload } from '../../../util/authStorage';
import { deleteModuleRequest } from '../ModuleActions';
import ModulePage from '../pages/ModulePage'
import { Col } from 'react-bootstrap';


export class ModuleListItem extends Component {
  constructor(props){
    super(props)
    this.state = { module: this.props.module }
  }

 
  
  modulePageElement = () => {
    
    return [<Col><ModulePage module={this.state.module} addElementFunctionToMainview={this.props.addElementFunctionToMainview} /></Col>];
   
  };

  render() {
    return (
      <div>
        {this.props.module.info}
        <Button onClick={()=> this.props.addElementFunctionToMainview(this.modulePageElement)}
        className={ getTokenPayload() ? 'btn btn-default pull-right' : 'hidden' } >
                <FormattedMessage id={'submitGo'} />&rarr;
        </Button>
      </div>
    );

  }
}

ModuleListItem.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModuleListItem;
