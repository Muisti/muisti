import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap';
import styles from './PostListPage.css';

// Import Components
import { confirmUserAccountRequest } from '../../../User/UserActions';
import { setStorage, getToken } from '../../../../util/authStorage';
import { show } from '../../../../util/styles';
import PostList from '../../components/PostList';
import ModuleList from '../../../Module/components/ModuleList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';
import AlertModal, { basicAlert, errorAlert } from '../../../App/components/AlertModal';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest, editPostRequest } from '../../PostActions';

// Import Selectors
import { getPosts } from '../../PostReducer';


class PostListPage extends Component {

  constructor(props) {
    super(props);
    this.state = { showAddPost: false, name: "Opetusmateriaali" };
    this.state = { renderFunctionsArray: [this.postElement, this.moduleListElement] }
    
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
  mainView = () => [this.postElement, this.moduleListElement];
  renderElements = [];  
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
    setTimeout(100);
    this.editingPost = null;
  };

  handleHidePost = () => {
    this.toggleAddPost();
    this.editingPost = null;
  };

  openEditPost = post => {
    this.editingPost = post;
    this.toggleAddPost();
  };

  openAddPost = () => {
    this.setState({ showAddPost: true });
  };
  closeAddPost = () => {
    this.setState({ showAddPost: false });
  };

  toggleAddPost = () => {
    this.setState({ showAddPost: !this.state.showAddPost });
  };

  showAddButton = () => !this.state.showAddPost && getToken();

  moduleListElement = () => {
    return (
            <Col xs={12} sm={9}>
              <ModuleList addElementFunctionToMainview={this.addToElementFunctionsArray} />
            </Col>
            );
  };

  postElement = () => {
    return (
            <Col xs={12} sm={3}>
              <div style={show(getToken())}>
                <PostCreateWidget
                  addPost={this.handleAddPost} showAddPost={this.state.showAddPost}
                  hideAddPost={this.handleHidePost} editPost={this.handleEditPost}
                  originalPost={this.editingPost} toggleAddPost={this.toggleAddPost}
                />
              </div>
              <PostList
                handleDeletePost={this.handleDeletePost} posts={this.props.posts}
                handleEditPost={this.openEditPost}
              />
            </Col>
            );
  };

  /*
    Function that is given to all children as a prop, so that
    they could update main page render function (ergo give new 
    view element to their parent). The function has three options: 
    without paramameter it adds mainpage elements, when given a 
    react array it replaceses current array and if given a react 
    element it adds it to the end of the array. 
  */  

  addToElementFunctionsArray = (elementFunction = null) => {
    
    if(!elementFunction){
      this.setState({renderFunctionsArray: this.mainView() })
    }else {
      this.setState({renderFunctionsArray: [...this.state.renderFunctionsArray, elementFunction]})
    }
    this.putElementsInRenderArray();
                     
};

  /*
    Creates component view from element functions to be given 
    to render function. 
  */
  putElementsInRenderArray = () => {
      this.renderElements = [];
      var element;
      
      this.state.renderFunctionsArray.some(f => {
        element = f();
        if(element.length){
          this.renderElements = element;
        }else {
          this.renderElements = [...this.renderElements, f() ];  
        }
        return element.length;
      });
  };

 

  render() {

    this.putElementsInRenderArray(); 
     
    return (
      <div>
        <Grid>
          <Row className="show-grid">
          
           {this.renderElements}
          
          </Row>
        </Grid>
        <AlertModal message={this.state.alert} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
//PostListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string.isRequired,
    shared: PropTypes.bool.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
