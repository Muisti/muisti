import { Router } from 'express';
import * as QuizController from '../controllers/quiz.controller';

const router = new Router();

router.route('/quizzes/:sectionCuid').get(QuizController.getQuizzes);

router.route('/quizzes').post(QuizController.addQuiz);

export default router;
