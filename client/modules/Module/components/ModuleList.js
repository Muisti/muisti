import React, { Component, PropTypes } from 'react';
import { Accordion, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ModuleListItem from './ModuleListItem';
import { getTokenPayload } from '../../../util/authStorage';
import { show } from '../../../util/styles';

import { fetchModules, addModuleRequest, deleteModuleRequest } from '../ModuleActions';

import styles from './ModuleList.css';

export class ModuleList extends Component {

  constructor() {
    super();
    this.state = { modules: [], formTitle: '', formInfo: '' };
  }

  componentDidMount() {
    fetchModules().then(modules => this.setState({modules}));
  }

  handleTitleChange = (e) => {
    this.setState({ formTitle: e.target.value });
  };

  handleInfoChange = (e) => {
    this.setState({ formInfo: e.target.value });
  };

  handleAddModule = () => {
    if (!this.state.formInfo || !this.state.formTitle) return;

    var number = 0;
    if (this.state.modules.length > 0) {
      number = this.state.modules[this.state.modules.length-1].orderNumber+1;
    }

    addModuleRequest({
      title: this.state.formTitle,
      info: this.state.formInfo,
      orderNumber: number })
      .then(module => this.setState({ modules: [...this.state.modules, module] }));
  };

  handleEditModule = () => {

  };

  addHeader = () => {
    return (
      <div className="clearfix">
        <div className={styles['panel-heading']}>
          {this.props.intl.messages.addModule}
        </div>
      </div>
    );
  };

  panelHeader = (module) => {
    return (
      <div className="clearfix">
        <div className={styles['panel-heading']}>
          {module.title}
          {this.panelDeleteButtonForAdmin(module)}
        </div>
      </div>
    );
  };

  panelDeleteButtonForAdmin = (module) => {
    if (getTokenPayload() && getTokenPayload().isAdmin) {
      return (
        <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={() => this.handleDeleteModule(module)}>
          Poista Module
        </Button>
      );
    }
  };

  handleDeleteModule = (module) => {
    if (window.confirm('Haluatko varmasti poistaa moduulin? Moduulin poisto poistaa myös koko moduulin sisällön.')) {
     deleteModuleRequest(module.cuid).then(this.setState({ modules: this.state.modules.filter(mod => mod.cuid !== module.cuid) }));
    }
  };

  render() {
    var i = 0;
    return (

      <Accordion>
        {this.state.modules.map(module => (
          <Panel header={this.panelHeader(module)} eventKey={++i} key={i}>
            <ModuleListItem module={module}/>
          </Panel>
        ))
        }

        <Panel header={this.addHeader()} bsStyle='success'
               className={ show(getTokenPayload() && getTokenPayload().isAdmin) }
               eventKey={++i}>
          <FormGroup>
            <ControlLabel> <FormattedMessage id={'moduleTitle'} /> </ControlLabel>
            <FormControl type="text" value={this.state.formTitle} onChange={this.handleTitleChange}
                         placeholder={this.props.intl.messages.moduleTitle} />

            <ControlLabel> <FormattedMessage id={'moduleContent'} /> </ControlLabel>
            <FormControl componentClass="textarea" value={this.state.fromInfo} onChange={this.handleInfoChange}
                         placeholder={this.props.intl.messages.moduleContent} />
            <Button type="submit" onClick={this.handleAddModule}> <FormattedMessage id={'submitAdd'} /> </Button>
          </FormGroup>
        </Panel>
      </Accordion>
    );
  }
}

ModuleList.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ModuleList);
