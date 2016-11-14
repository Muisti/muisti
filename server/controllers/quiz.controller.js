import Quiz from '../models/quiz';
import cuid from 'cuid';

import { decodeTokenFromRequest } from './user.controller';

export async function getQuizzes (req, res) {
  let token = await decodeTokenFromRequest(req);
  if (!token) {
    return res.status(403).end();
  }

  Quiz.find({ sectionCuid: req.params.sectionCuid }).exec((err, quizzes) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ quizzes });
  })
}

export async function getQuizzesForSection(section) {
  let quizzes = await Quiz.find({ sectionCuid: section.cuid }).exec();
  return quizzes;
}

export async function addQuiz (req, res) {
  let token = await decodeTokenFromRequest(req);
  var quiz = req.body.quiz;

  if (!token || !token.isAdmin || !quiz || !quiz.sectionCuid || !quiz.question || !quiz.options) {
    return res.status(403).end();
  }

  const newQuiz = new Quiz(quiz);
  newQuiz.cuid = cuid();

  return newQuiz.save()
    .then(() => res.json({ quiz: newQuiz }))
    .catch(err => {
      return res.status(500).send(err);
    });
}
