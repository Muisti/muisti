import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  constructor(props) {
    super(props);
  }
  
  addPost = () => {
    const nameRef = this.refs.name;
    const contentRef = this.refs.content;
    if (nameRef.value && contentRef.value) {
      this.props.addPost(nameRef.value, contentRef.value);
      nameRef.value = contentRef.value = '';
}
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
       <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
       </div>
    );
    
  }
}


PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
