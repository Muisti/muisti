import React, { Component, PropTypes } from 'react';
import { Accordion, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ModuleListItem from './ModuleListItem';
import ModuleCreateWidget from './ModuleCreateWidget';
import { getTokenPayload } from '../../../util/authStorage';
import { show } from '../../../util/styles';
import { connect } from 'react-redux';
import { fetchModules, addModuleRequest, deleteModuleRequest, editModuleRequest, editModule } from '../ModuleActions';
import { getModules } from '../ModuleReducer';
import styles from './ModuleList.css';
import { getIntl } from '../../Intl/IntlReducer'
/*
 * ModuleList is a list of ModuleListItems. It takes care of adding, editing and
 * removing ModuleListItems from it's array and sending it to the db.
 * 
 * Contains ModuleListItems to list them and ModuleCreateWidget to create and edit the Items
 */

export class ModuleList extends Component {

  constructor(props) {
    super(props);
    this.state = { editing: -1 };
  }

  buttonId = -1;

  componentDidMount() {
    this.props.dispatch(fetchModules());
    
  }

  handleAddModule = (title, info) => {
    if (!title || !info) return;

    var number = 0;
    if (this.props.modules.length > 0) {
      number = this.props.modules[this.props.modules.length-1].orderNumber+1;
    }

    this.props.dispatch(addModuleRequest({
      title: title,
      info: info,
      orderNumber: number }));
      
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

  panelHeader = (module, index) => {
    return (
      <div className="clearfix">
        <div className={styles['panel-heading']}>
          {module.title}
          {this.panelEditButtonForAdmin(module, index)}
          {this.panelDeleteButtonForAdmin(module, index)}
        </div>
      </div>
    );
  };
  
  panelEditButtonForAdmin = (module, index) => {
    if (getTokenPayload() && getTokenPayload().isAdmin) {
      return (
        <Button className="pull-right" bsStyle="warning" bsSize="xsmall" onClick={this.showEditModule(module, index)}>
          {this.props.intl.messages.editModule}
        </Button>
      )
    }
  }

  panelDeleteButtonForAdmin = (module, index) => {
    if (getTokenPayload() && getTokenPayload().isAdmin) {
      return (
        <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={this.handleDeleteModule(module, index)}>
         {this.props.intl.messages.deleteModule}
        </Button>
      );
    }
  };
  
  updateSelection = index => {
      const nextOpen = (this.state.open === index) ? null : index;
      this.state = {...this.state, open: nextOpen};
  };
  
  showEditModule = (module, index) => e => {
      if(this.state.open === index && this.state.editing !== index){ 
          e.stopPropagation();
      }
      if(this.state.editing != -1){
        this.setState({ editing: -1 });
      }else{
        this.setState({ editing: index });
      } 
  };
  
  handleEditModule = (module) => (title, info) => {
      module.info = info;
      module.title = title;
      editModuleRequest(module).then(module => {
                  this.props.dispatch(editModule(module));            
                  this.setState({ editing: -1 });
      });
  };

  handleDeleteModule = (module, index) => e => {
     if(this.state.open !== index){ e.stopPropagation(); }
//   if (window.confirm('Haluatko varmasti poistaa moduulin? Moduulin poisto poistaa myös koko moduulin sisällön.')) {
     this.props.dispatch(deleteModuleRequest(module.cuid));
        
//  }
  };
  closeEditing = () => {
    if(this.state.editing != -1)
      this.setState({ editing: -1 }); 
  };
  

  render() {
    var i = 0;
    return (
      
      <Accordion onSelect={this.updateSelection} >
        {this.props.modules.map(module => (
          <Panel onSelect={this.closeEditing} header={this.panelHeader(module, ++i)} eventKey={i} key={i}>
            <div style={show( i===this.state.editing)}>
              <ModuleCreateWidget sendModule={this.handleEditModule(module)}
                    oldModule={{title: module.title, info: module.info}} />
            </div>
            <div style={show( i!==this.state.editing)}>
              <ModuleListItem module={module} addElementFunctionToMainview={this.props.addElementFunctionToMainview} />
            </div>
          </Panel>
        ))
        }

        <Panel header={this.addHeader()} bsStyle='success'
               style={ show(getTokenPayload() && getTokenPayload().isAdmin) }
               eventKey={++i}>
            <ModuleCreateWidget sendModule={this.handleAddModule}/>
        </Panel>
      </Accordion>
    
    );
  }
}

function mapStateToProps(state) {
  return {
    modules: getModules(state),
    intl: getIntl(state),
  };
}



ModuleList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    orderNumber: PropTypes.number.isRequired,
  })).isRequired,
  intl: intlShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(injectIntl(ModuleList));
