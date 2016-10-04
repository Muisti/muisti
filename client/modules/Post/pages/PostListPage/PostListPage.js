import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import styles from './PostListPage.css';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest, editPostRequest } from '../../PostActions';

// Import Selectors
import { getPosts } from '../../PostReducer';

class PostListPage extends Component {

    constructor(props) {
        super(props);
        this.state = { showAddPost: false, name: "Matti Meikäläinen" };
    }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  editingPost = null;

  handleDeletePost = post => {
    if (window.confirm('Haluatko varmasti poistaa viestin?')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, content, important) => {
    this.toggleAddPost();
    this.props.dispatch(addPostRequest({ name, content, important }));
    this.props.dispatch(fetchPosts());
  };

  handleEditPost = post => {
    this.toggleAddPost();
    this.props.dispatch(editPostRequest(post));
    setTimeout(100)
    this.editingPost = null;

  };

  handleHidePost = () => {
    this.toggleAddPost();
    this.editingPost = null;
  };

  openEditPost = post => {
    this.editingPost = post;
    this.toggleAddPost();
    this.setState({}); //update ui

  };

  openAddPost = () => {
      this.setState({ showAddPost: true });
  }
  closeAddPost = () => {
      this.setState({ showAddPost: false });
  }

  toggleAddPost = () => {
      this.setState({ showAddPost: !this.state.showAddPost });
  }

  render() {
    return (
      <div>
      
        <div className={styles['topBar']}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Default_User_Logo.jpg" />
            <span className={styles['nameTitle']}>{this.state.name}</span>
            <span className={this.state.showAddPost ? 'hidden' : ''}>
              <Button href='#' onClick={this.toggleAddPost}>
                <FormattedMessage id="addPost" />
              </Button>
            </span>
        </div>
        <PostCreateWidget
          addPost={this.handleAddPost} showAddPost={this.state.showAddPost}
          hideAddPost={this.handleHidePost} editPost={this.handleEditPost}
          originalPost={this.editingPost}
        />
        <Grid>
          <Row className="show-grid">
            <Col xs={16} md={4}>
              <PostList
                handleDeletePost={this.handleDeletePost} posts={this.props.posts}
                handleEditPost={this.openEditPost} importanceColumn={true}
              />
            </Col>
            <Col xs={12} md={7}>
              <PostList
                handleDeletePost={this.handleDeletePost} posts={this.props.posts}
                handleEditPost={this.openEditPost} importanceColumn={false}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
