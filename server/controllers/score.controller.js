import Score from '../models/score';

import { decodeTokenFromRequest } from './user.controller';


export async function getScores(req, res) {
    let token = await decodeTokenFromRequest(req);
    if (!token) {
      return res.status(403).end();
    }
    Score.findOne({ userCuid: token.cuid }).exec((err, scores) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({ scores })
    });
}

export async function setScore(req, res) {
    let token = await decodeTokenFromRequest(req);
    let quizzes = req.body.quizzes;

    if (!token) {
      return res.status(403).end();
    }

    let foundScore = await Score.findOne({ userCuid: token.cuid }).exec();
    if (!foundScore) {
        foundScore = new Score({ userCuid: token.cuid, scores: [] });
    }

    quizzes.forEach(quiz => {
      var newScore = { quizCuid: quiz.cuid, quizPoints: quiz.points };
      foundScore.scores = foundScore.scores.filter(s => s.quizCuid != quiz.cuid);
      foundScore.scores.push(newScore);
    });
    foundScore.save()
      .then(() => res.json({ score: foundScore }))
      .catch(err => {
        return res.status(500).send(err);
      });
}

