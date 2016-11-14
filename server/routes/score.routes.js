import { Router } from 'express';
import * as ScoreController from '../controllers/score.controller';
const router = new Router();

// Get all Scores
router.route('/scores').get(ScoreController.getScores);

// Update one score
router.route('/scores').put(ScoreController.setScore);

export default router;
