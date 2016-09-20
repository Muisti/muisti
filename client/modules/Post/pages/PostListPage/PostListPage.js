import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest, editPostRequest } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

class PostListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  editingPost = null;

  handleDeletePost = post => {
    if (confirm('Haluatko varmasti poistaa viestin?')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, content, important) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, content, important }));
    this.props.dispatch(fetchPosts());
  };

  handleEditPost = post => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(editPostRequest(post));
    setTimeout(100);
    this.props.dispatch(fetchPosts());
  };

  handleHidePost = () => {
    this.props.dispatch(toggleAddPost());
  };

  openEditPost = post => {
    this.editingPost = post;
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        <PostCreateWidget
          addPost={this.handleAddPost} showAddPost={this.props.showAddPost}
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
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
