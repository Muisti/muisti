import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Panel } from 'react-bootstrap';
import { getTokenPayload } from '../../../../util/authStorage';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {

  constructor(){
    super();
    this.clearFields();
  }

  //user is writing new post if originalPost is not defined
  originalPost = null;
  isNewPost = () => !this.originalPost;

  // these functions allow input-fields editing
  changeContent = event => this.setState({...this.state, content: event.target.value});

  clearFields = () => { this.state = {name: "", content: ""}; };

  editPost = () => {
    this.props.editPost({
      ...this.originalPost,
      content: this.refs.content.value
    });
  };

  addPost = () => {
    const contentRef = this.refs.content;
    //Only admins can create public posts.
    const publicPost = !this.refs.private.checked && getTokenPayload() && getTokenPayload().isAdmin;
    if (contentRef.value) {
      this.props.addPost(contentRef.value, publicPost);
      contentRef.value = '';
      this.clearFields();
    }
  };

  submit = () => {
    if(this.isNewPost()){
      this.addPost();
    } else {
      this.editPost();
    }
  };

  cancel = () => {
    this.clearFields();
    this.originalPost = null;
    this.props.hideAddPost();
  };

  //updating this components own state based on props
  updateState = () => {
    const postChanged = (this.props.originalPost != this.originalPost);

    if(postChanged){
      if(this.props.originalPost == null){
        this.clearFields();
      }else{
        var post = this.props.originalPost;
        this.state = {content: post.content};
      }
      this.originalPost = this.props.originalPost;

    }
  };

  panelHeader = (title) => {
    return (
      <div className="clearfix" onClick={this.props.toggleAddPost}>
        <div className={styles['panel-heading']}>
          <FormattedMessage id={title} />
        </div>
      </div>
    );
  };

  render() {
    this.updateState();

    const submitText = this.isNewPost() ? "submitAdd" : "submitEdit";
    const title = this.isNewPost() ? "createNewPost" : "editPost";
    const isAdmin = getTokenPayload() && getTokenPayload().isAdmin;
    return (

      <Panel header={this.panelHeader(title)} bsStyle="success"
             collapsible expanded={this.props.showAddPost}>
          <div className={styles['form-content']}>
            <div className={this.isNewPost() && isAdmin ? 'bootstrap-switch-square' : 'hidden'} >
              <input type="checkbox" ref="private"/> <FormattedMessage id="isPrivate"/>
            </div>

            <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content"
                      value={this.state.content} onChange={this.changeContent}/>
            <a className={styles['post-submit-button']} href="#" onClick={this.submit}><FormattedMessage id={submitText} /></a>
            <a className={styles['post-submit-button']} href="#" onClick={this.cancel}><FormattedMessage id="cancel" /></a>

          </div>
      </Panel>
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
  toggleAddPost: PropTypes.func.isRequired
};

export default injectIntl(PostCreateWidget);
