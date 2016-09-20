import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Time from 'react-time'
import { Panel } from 'react-bootstrap';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
          <Panel header={props.post.name}>
            <p className={styles['post-desc']}>{props.post.content}</p>
            <p className={styles['post-desc']}><Time value={props.post.dateAdded} format="DD.MM.YYYY HH:mm:ss"/></p>
            <p className={styles['post-action']}><a href="/" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
            <p className={styles['post-action']}><a href="#" onClick={props.onEdit}>Muokkaa viestiä</a></p>
          </Panel>
   );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.date,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default PostListItem;
