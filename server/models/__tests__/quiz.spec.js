import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import Quiz from '../quiz';
import Score from '../score';
import { connectDB, dropDB } from '../../util/test-helpers';

const newQuiz = new Quiz(
	{cuid: '44', sectionCuid: '33', 
	question: 'Hauki kala?', 
	options: [{ text: 'on', answer: true }] }
	);

const newScore = new Score(
	{userCuid: '55',
	scores:[{quizCuid: '44', quizPoints: 1}, {quizCuid: '55', quizPoints: 1}]}
	);

const newScore2 = new Score(
	{userCuid: '66',
	scores:[{quizCuid: '44', quizPoints: 1}, {quizCuid: '66', quizPoints: 1}]}
	);


test.serial('Removing quiz removes dependent scores from scores array', async t =>{
	
	await newQuiz.save();
	await newScore.save();	
	await newScore2.save();

	await newQuiz.remove();
	
	const scores = await Score.find().exec();

	t.is(scores[0].scores.length, 1);
	t.is(scores[1].scores.length, 1);


	await Score.remove().exec();		
	
});