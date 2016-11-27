import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

const module = new Module({cuid: '583b0e90b9492c16c4acc462', title: 'Moduuli', info:'sis', orderNumber: 1});
const sections = [new Section({
    cuid: 'cuid12',
    content: 'Sections content',
    title: 'Title',
    quizzes: [{sectionCuid: 'cuid12', question: 'What animal?', options: [{ text: 'Cat', answer: true }, {text: 'Snake', answer: false}]}]
  }),new Section({
    cuid: 'cuid13',
    content: 'Sections content',
    title: 'Title',
    quizzes: [{sectionCuid: 'cuid13', question: 'What animal?', options: [{ text: 'Cat', answer: true }, {text: 'Snake', answer: false}]}]
  })
];

test.beforeEach.serial('connect and add one module two sections', t => {
  connectDB(t, () => {
    Module.create(module, err => {
      if (err) t.fail('Unable to create module');
    });
 	 	 Module.create(sections, err => {
      if (err) t.fail('Unable to create sections');
    });
	});

});

test.afterEach.always.serial(t => {
  dropDB(t, () => {
    return;
  });
});
