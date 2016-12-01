import Quiz from '../models/quiz';
import cuid from 'cuid';
import { removeScorefromScoresArrays } from './score.controller';

import { decodeTokenFromRequest } from './user.controller';

export async function getQuizzes (req, res) {
 let token = decodeTokenFromRequest(req);
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

export async function addQuiz(req, res) {
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

export async function deleteQuiz(req, res) {

  let token = await decodeTokenFromRequest(req);

  if(!token || !token.isAdmin) return res.status(403).end();

  Quiz.findOne({ cuid: req.params.cuid }).exec((err, quiz) => {
    if(err){
      return res.status(500).send(err);
    }else if(!quiz){
      return res.status(404).end();
    }
    return quiz.remove(() => res.status(200).end());

  });

}

export async function updateQuiz(req, res) {

  let token = await decodeTokenFromRequest(req);

  if(!token || !token.isAdmin) return res.status(403).end();

  const quiz = req.body.quiz;

  Quiz.findOne({ cuid: quiz.cuid }).exec((err, q) => {
    if(err) return res.status(500).send(err);

    console.log(areOptionsEqual(q.options, quiz.options));
    if (!areOptionsEqual(q.options, quiz.options)){
      removeScorefromScoresArrays(q.cuid);
    }

  });


  Quiz.update({ cuid: quiz.cuid }, { question: quiz.question, 
    options: quiz.options}, function(err){
      if(err) return res.status(500).send(err);
      
      return res.json({ quiz: quiz });
    });

}


function areOptionsEqual(arr1, arr2){

  if(arr1.length != arr2.length)
    return false;


    if(arr1.find(obj => 
      !arr2.find(obj2 => 
        obj.text === obj2.text && obj.answer === obj2.answer )))
      return false;
  
  return true;
}