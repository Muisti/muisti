import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import Time from 'react-time'
import {Grid, Row, Col, Panel, Pagination,Button, Well, Label, Input, ButtonInput, MenuItem} from 'react-bootstrap';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
   return (

     <Grid>
       <Row className="show-grid">
         <Col xs={12} md={7}>

           <Panel header={props.post.name}>
             <p className={styles['post-desc']}>{props.post.content}</p>
             <p className={styles['post-desc']}><Time value={props.post.dateAdded} format="DD.MM.YYYY HH:mm:ss"/></p>
             <p className={styles['post-action']}><a href="/" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
           </Panel>

         </Col>
         <Col xs={16} md={4}>
           <Panel header={props.post.name}>
             <p className={styles['post-desc']}>{props.post.content}</p>
             <p className={styles['post-desc']}><Time value={props.post.dateAdded} format="DD.MM.YYYY HH:mm:ss"/></p>
             <p className={styles['post-action']}><a href="/" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
           </Panel>
         </Col>
       </Row>
     </Grid>
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
