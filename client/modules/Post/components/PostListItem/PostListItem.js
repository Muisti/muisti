import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Time from 'react-time';
import { Panel } from 'react-bootstrap';

// Import Style
import styles from './PostListItem.css';


function PostListItem(props) {
    
  return (
    <Panel header={props.post.name} bsStyle={props.post.shared ? 'default' : 'success'}>
      <p className={styles['post-desc']}>{props.post.content}</p>
      <p className={styles['post-desc']}><Time value={props.post.dateAdded} format="DD.MM.YYYY HH:mm:ss" /></p>
        <p className={styles[props.post.own ? 'post-action' : 'hidden']}>
          <a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a> &nbsp; | &nbsp;
          <a href="#" onClick={props.onEdit}><FormattedMessage id="editPostLink" /></a>
        </p>
    </Panel>

  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.date,
    own: PropTypes.boolean,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default PostListItem;
