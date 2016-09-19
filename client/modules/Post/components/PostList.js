import React, { PropTypes } from 'react';

// Import Components
import PostListItem from './PostListItem/PostListItem';

function PostList(props) {
  return (
    <div className="listView">
      {
        props.posts.filter(post => (post.important == props.importanceColumn)).map(post => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  importanceColumn: PropTypes.bool.isRequired,
};

export default PostList;
