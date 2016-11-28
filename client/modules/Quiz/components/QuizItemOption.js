import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from './style.css';

export class QuizItemOption extends Component {
    
    constructor(props) {
        super(props);
    }
    
    changeChecked = () => {
        this.props.option.checked = !this.props.option.checked;
        this.setState({});
    }
    
    render() {
      const highlight = this.props.option.highlight;
      
      return (
        <div className={styles.optionArea + (highlight ? ' ' + styles.optionHighlight : '')}>
          <label className={styles.optionLabel}>
            <span className={styles.checkbox}>
            <input type="checkbox" onClick={this.changeChecked}
              checked={this.props.option.checked} disabled={this.props.option.disabled}/>
            </span>
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