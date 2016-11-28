import test from 'ava';
import request from 'supertest';
import app from '../../server'
import { connectDB, dropDB } from '../../util/test-helpers';
import mongoose from 'mongoose';
import sinon from 'sinon';

import * as usercon from '../user.controller';
import Quiz from '../../models/quiz';
import Section from '../../models/section';
import * as jwt from 'jwt-simple';

const sections = [
  new Section({ moduleCuid: 'module12', content: 'First section', orderNumber:1, cuid: 'section12' }),
  new Section({ moduleCuid: 'module12', content: 'Second section', orderNumber:2, cuid: 'section34' })
];

const quizzes = [
  new Quiz({ cuid: 'quiz123', sectionCuid: 'section12', question: 'What animal?',
    options: [{ text: 'Cat', answer: true }, { text: 'Dog', answer: false }] }),
  new Quiz({ cuid: 'quiz456', sectionCuid: 'section12', question: 'Where do i live?',
    options: [{ text: 'Sweden', answer: false }, { text: 'Finland', answer: true }, { text: 'Canada', answer: false }] }),
  new Quiz({ cuid: 'quiz789', sectionCuid: 'section34', question: 'Question?',
    options: [{ text: 'Right', answer: true }, { text: 'Wrong', answer: false }] })
];

test.beforeEach.serial('connect and add', t => {
  connectDB(t, () => { });
});

test.afterEach.always.serial(t => {
  dropDB(t, () => {
    return;
  });
});

test.serial('Should correctly give number of quizzes', async t => {
  await data();

  const res = await request(app)
    .get('/api/quizzes/' + sections[0].cuid + '/')
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const howManyQuizzes = await Quiz.find({ sectionCuid: sections[0].cuid }).exec();
  t.deepEqual(res.body.quizzes.length, howManyQuizzes.length);

  await drop();
});

test.serial('Adds new quiz correctly', async t => {
  await data();

  const quiz = { sectionCuid: 'section34', question: 'New question?',
    options: [{text: 'Cat', answer: true},{text: 'Dog', answer: false}]};

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
  var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
  stub.returns(jwt.decode(token, 'secret', true));

  const res = await request(app)
    .post('/api/quizzes')
    .send({ quiz })
    .set('Accept', 'application/json')
    .set('authorization', token);

  t.is(res.status, 200);

  stub.restore();
  await drop();
});

test.serial('deletes a single quiz', async t => {
    await data();

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns(jwt.decode(token, 'secret', true));

    let quiz = quizzes[1];

    const res = await request(app)
            .delete('/api/quizzes/'+quiz.cuid)
            .send({ quiz })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 200);

    const p = await Quiz.findOne({ cuid: quiz.cuid }).exec();
    t.is(p, null);
    stub.restore();
    await drop();
});

test.serial('deleting quiz fails without token', async t => {
    await data();

    const token = "nottoken";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns("");

    let quiz = quizzes[1];

    const res = await request(app)
            .delete('/api/quizzes/'+quiz.cuid)
            .send({ quiz })
            .set('Accept', 'application/json')
            .set('authorization', "");

    t.is(res.status, 403);

    const p = await Quiz.findOne({ cuid: quiz.cuid }).exec();
    t.is(quiz.question, p.question);

    stub.restore();
    await drop();
});

test.serial('deleting quiz fails if not admin', async t => {
    await data();

    const token = "nottoken";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns("imnotadmin");

    let quiz = quizzes[1];

    const res = await request(app)
            .delete('/api/quizzes/'+quiz.cuid)
            .send({ quiz })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 403);

    const p = await Quiz.findOne({ cuid: quiz.cuid }).exec();
    t.is(quiz.question, p.question);

    stub.restore();
    await drop();
});

let data = async () => {
  await Promise.all(sections.map(section => {
    return new Section(section).save();
  }));
  await Promise.all(quizzes.map(quiz => {
    return new Quiz(quiz).save();
  }));
};

let drop = async () => {
  await Section.remove({}).exec();
  await Quiz.remove({}).exec();
};
