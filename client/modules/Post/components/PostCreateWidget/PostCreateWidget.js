import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Checkbox } from 'react-bootstrap';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {

  constructor(){
      super();
      this.state = {name: "", content: ""};
  } 
  
  originalPost = null;
  
  // these functions allow input-fields editing
  changeName = event => this.setState({...this.state, name: event.target.value});
  changeContent = event => this.setState({...this.state, content: event.target.value});
  

  addPost = () => {
    if(this.state.originalPost){  //editing existing post
        console.log("EDITING");
        this.props.editPost({
            ...this.state.originalPost,
            content: this.refs.content.value
        });
    }else{  //adding new post
        console.log("ADDING NEW");
        const nameRef = this.refs.name;
        const contentRef = this.refs.content;
        const importantRef = this.refs.important.checked;
        if (nameRef.value && contentRef.value) {
          this.props.addPost(nameRef.value, contentRef.value, importantRef);
          nameRef.value = contentRef.value = '';
        }
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    
    if(this.props.originalPost != this.originalPost && this.props.originalPost != null){
        var post = this.props.originalPost;
        this.state = {name: post.name, content: post.content, originalPost: post};
        this.originalPost = this.props.originalPost;
    }
    
    return (
      <div className={cls}> 
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
  
          <div class="bootstrap-switch-square">
              <input type="checkbox" ref="important" /> <FormattedMessage id="isImportant"/>
          </div>
  
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name"
            value={this.state.name} onChange={this.changeName}/>
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" 
            value={this.state.content} onChange={this.changeContent}/>
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
          <a className={styles['post-submit-button']} href="#" onClick={this.hideAddPost}><FormattedMessage id="cancel" /></a>
        </div>
      </div>
    );
  }

}


PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  editPost: PropTypes.func.isRequired,
  originalPost: PropTypes.object,
  intl: intlShape.isRequired,
  hideAddPost: PropTypes.func.isRequired,
};

export default injectIntl(PostCreateWidget);
