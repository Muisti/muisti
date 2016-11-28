import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import Quiz from '../quiz';
import Section from '../section';
import { connectDB, dropDB } from '../../util/test-helpers';


const newSection = new Section(
	{cuid:'33', moduleCuid: '11', 
	title: 'Section', orderNumber: 3 }
	);

const newQuiz = new Quiz(
	{cuid: '44', sectionCuid: '33', 
	question: 'Hauki kala?', 
	options: [{ text: 'on', answer: true }] }
	);

const newQuiz2 = new Quiz(
	{cuid: '55', sectionCuid: '33', 
	question: 'Kotka lintu?', 
	options: [{ text: 'on', answer: true }] }
	);

test.serial('Removing section removes dependent quizzes', async t =>{
	
	await newSection.save();
	await newQuiz.save();	
	await newQuiz2.save();

	await newSection.remove();
	//const module = await Module.find().exec();
	const quizzes = await Quiz.find().exec();

	t.is(quizzes.length, 0);


});