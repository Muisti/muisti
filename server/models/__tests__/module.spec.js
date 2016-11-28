import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import Module from '../module';
import Section from '../section';
import { connectDB, dropDB } from '../../util/test-helpers';


const newModule = new Module(
	{ cuid: '11', title: 'Moduuli', 
		info: 'sis.', orderNumber: 1 }
		);  

const newSection = new Section(
	{cuid:'33', moduleCuid: '11', 
	title: 'PoistoSection 2', orderNumber: 3 }
	);

const remSection = new Section(
	{cuid:'22', moduleCuid: '11', 
	title: 'PoistoSection', orderNumber: 2 }
	);


test.serial('Removing module removes dependent sections', async t =>{
	
	await newModule.save();
	await remSection.save();	
	await newSection.save();

	await newModule.remove();
	
	const sections = await Section.find().exec();

	t.is(sections.length, 0);


});