/**
 * Created by susisusi on 12/09/16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components

import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';


class Muisti extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
        <p>Muistiprojekti ....</p>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
  Muisti.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state)
  };
}

Muisti.propTypes = {
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

Muisti.contextTypes = {
  router: React.PropTypes.object
};

export default connect(mapStateToProps)(Muisti);
