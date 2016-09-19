import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Time from 'react-time'

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  var format = "YYYY-MMM-DD DDD";
   return (
    <div className={styles['single-post']}>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
      <p className={styles['post-desc']}>{props.post.content}</p>
      <p className={styles['post-desc']}><Time value={props.post.dateAdded} format="DD.MM.YYYY HH:mm:ss"/></p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.date,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
