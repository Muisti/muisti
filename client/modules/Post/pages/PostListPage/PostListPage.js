import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import styles from './PostListPage.css';
import { confirmUserAccountRequest } from '../../../User/UserActions';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';
import AlertModal, { basicAlert, errorAlert } from '../../../App/components/AlertModal';

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

    if(this.props.params.confirmCode){
      confirmUserAccountRequest(this.props.params.confirmCode, success => {
        this.setState({
          alert: (success ?
              basicAlert("Käyttäjätunnuksesi on vahvistettu!", "Voit kirjautua sisään sähköpostillasi.")
              : errorAlert("Käyttäjätunnuksen vahvistaminen epäonnistui!", "Ota yhteys ylläpitäjään.")
          )});
      });
    }
  }

  editingPost = null;

  handleDeletePost = post => {
    if (window.confirm('Haluatko varmasti poistaa viestin?')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (content, shared) => {
    this.toggleAddPost();
    this.props.dispatch(addPostRequest({ content, shared }));
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
        </div>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} xsOffset={1}>
              <span className={this.state.showAddPost ? 'hidden' : ''}>
                <Button href='#' onClick={this.toggleAddPost}>
                  <FormattedMessage id="addPost" />
                </Button>
              </span>
            </Col>
          </Row>
          <br/>
          <Row className="show-grid">
            <Col xs={12} sm={3}>
              <PostCreateWidget
                addPost={this.handleAddPost} showAddPost={this.state.showAddPost}
                hideAddPost={this.handleHidePost} editPost={this.handleEditPost}
                originalPost={this.editingPost}
              />
              <PostList
                handleDeletePost={this.handleDeletePost} posts={this.props.posts}
                handleEditPost={this.openEditPost}
              />
            </Col>
            <Col xs={12} sm={9}>
              <Panel header="Moduulien sijoitus">
              </Panel>
            </Col>
          </Row>
        </Grid>
        <AlertModal message={this.state.alert} />
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
    userCuid: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    shared: PropTypes.bool.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
