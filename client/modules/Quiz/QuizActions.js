import callApi from '../../util/apiCaller';

export function addQuizRequest(quiz) {
  return callApi('quizzes', 'post', {quiz})
    .then(res => res.quiz);
}

export function fetchScores() {
    return callApi('scores', 'get')
      .then(res => res.modules);
}

export function sendScoreRequest(quiz) {
    return callApi('scores', 'put', {quiz})
        .then(res => res.module);
}