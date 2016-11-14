import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Panel, Button } from 'react-bootstrap';

import { fetchScore, sendScoreRequest } from '../QuizActions';

function PostListItem(props) {
    //QUIZ has .points and .cuid
  var quiz = { points: 3, cuid: 'abcdefgthisiscuid123' };
  
  var sendthis = (quiz) => () => sendScoreRequest(quiz);
  
  return (
    <Panel key='5000'>
        asdasdasd
        <Button onClick={sendthis(quiz)}> Nappi </Button>
    </Panel>
  );
}

export default PostListItem;
