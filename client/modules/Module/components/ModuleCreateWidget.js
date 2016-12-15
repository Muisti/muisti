import React, { Component, PropTypes } from 'react';
import { Accordion, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export class ModuleCreateWidget extends Component {

    constructor() {
        super();
        this.state = { formTitle: '', formInfo: '' };
    }
    
    componentDidMount() {
        if (this.props.oldModule && this.state.formTitle === '' && this.state.formInfo === '') {
            this.setState({ formTitle: this.props.oldModule.title, formInfo: this.props.oldModule.info});
        }
    }
    
    
    handleTitleChange = (e) => {
      this.setState({ formTitle: e.target.value });
    };

    handleInfoChange = (e) => {
      this.setState({ formInfo: e.target.value });
    };
    
    addModule = () => {
        this.props.sendModule(this.state.formTitle, this.state.formInfo);
        
        if(!this.props.oldModule){
          this.setState({ formTitle: '', formInfo: '' });
        }

    };
    
    render() {
        return (
          <FormGroup>
            <ControlLabel> <FormattedMessage id={'moduleTitle'} /> </ControlLabel>
            <FormControl type="text" value={this.state.formTitle} onChange={this.handleTitleChange}
                         placeholder={this.props.intl.messages.moduleTitle} />

            <ControlLabel> <FormattedMessage id={'moduleContent'} /> </ControlLabel>
            <FormControl componentClass="textarea" value={this.state.formInfo} onChange={this.handleInfoChange}
                         placeholder={this.props.intl.messages.moduleContent} />
            <Button type="submit" onClick={this.addModule}> <FormattedMessage id={'submitAdd'} /> </Button>
          </FormGroup>
        );
    }
}

ModuleCreateWidget.propTypes = {
    intl: intlShape.isRequired,
    sendModule: PropTypes.func.isRequired,
    oldModule: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired
    }))
};

export default injectIntl(ModuleCreateWidget);