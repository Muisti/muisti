import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export class QuizItemOption extends Component {
    
    constructor(props) {
        super(props);
    }
    
    changeChecked = () => {
        this.props.option.checked = !this.props.option.checked;
        this.setState({});
    }
    
    render() {
      
      return (
        <div style={{marginLeft: '15px', paddingLeft: '10px', background: this.props.option.highlight ? '#ddffdd' : 'white'}}>
            <label><input type="checkbox" style={{marginRight: '6px'}} disabled={this.props.option.disabled} 
                  onClick={this.changeChecked} checked={this.props.option.checked}/>
                    {this.props.option.text}
            </label>
        </div>
      );  
    }
}

QuizItemOption.propTypes = {
      option: PropTypes.shape({
        text: PropTypes.string.isRequired,
        answer: PropTypes.bool.isRequired,
        checked: PropTypes.bool
      }).isRequired,
      
};
