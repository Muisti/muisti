import callApi from '../../util/apiCaller';

export function addQuizRequest(quiz) {
  return callApi('quizzes', 'post', {quiz})
    .then(res => res.quiz);
}

export function fetchScores() {
    return callApi('scores', 'get')
      .then(res => res.modules);
}

export function sendScoreRequest(quizzes) {
    return callApi('scores', 'put', {quizzes})
        .then(res => res.module);
}