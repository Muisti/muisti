import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import Module from '../module';
import Section from '../section'
import { connectDB, dropDB } from '../../util/test-helpers';

const newModule = new Module({cuid: '583b0e90b9492c16c4acc462', title: 'Moduuli', info:'sis', orderNumber: 1 });
const newSection = new Section({cuid:'2345677888888989', moduleCuid:'583b0e90b9492c16c4acc462', title: 'koe title', orderNumber: 1})
const newSection2 = new Section({cuid:'2222222222222222', moduleCuid:'583b0e90b9492c16c4acc462', title: 'koe title 2', orderNumber: 2})



test.serial('Removes sections when module removed', async t => {
	await newModule.save();
	await newSection.save();
	

	await newModule.remove();
	var section = await Section.find().exec();
	//const module = await Module.find().exec((err, m) => {console.log(m)});
	
	console.log(section);

	t.is(section.length, 0);
	




});
