import Score from '../models/score';

import { decodeTokenFromRequest } from './user.controller';


export async function getScores(req, res) {
    let token = await decodeTokenFromRequest(req);
    if (!token) {
      return res.status(403).end();
    }
    
    Score.findOne({ userCuid: token.cuid }).exec((err, score) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json({ score })
    });
};

export async function setScore(req, res) {
    let token = await decodeTokenFromRequest(req);
    let quiz = req.body.quiz;
    
    if (!token) {
      return res.status(403).end();
    }
    
    let foundScore = await Score.findOne({ userCuid: token.cuid }).exec();
    if (!foundScore) {
        foundScore = new Score({ userCuid: token.cuid, scores: [] });
    }
    
    var newScore = { quizCuid: quiz.cuid, quizPoints: quiz.points };
    
    foundScore.scores = foundScore.scores.filter(s => s.quizCuid != quiz.cuid);
    foundScore.scores.push(newScore);

    foundScore.save()
      .then(() => res.json({ score: foundScore }))
      .catch(err => {
        return res.status(500).send(err);
      });
}

//export async function setScore(req, res) {
//    let token = await decodeTokenFromRequest(req);
//    console.log('token: ' + token);
//    let quiz = req.body.quiz;
//    console.log(quiz);
//    if (!token) {
//      return res.status(403).end();
//    }
//    
//    Score.findOneAndUpdate({ userCuid: token.cuid, 'scores.quizCuid': quiz.cuid }, 
//        { 'scores.$.quizPoints': quiz.points }, { upsert:true, new:true }).exec((err, score) => {
//        if (err) return res.status(500).send(err);
//        return res.json({ score });
//    });
//};