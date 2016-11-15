import test from 'ava';
import request from 'supertest';
import app from '../../server'
import { connectDB, dropDB } from '../../util/test-helpers';
import mongoose from 'mongoose';
import Score from '../../models/score';
import User from '../../models/user';

import * as bcrypt from 'bcryptjs';
//Used to stub token, keep our own tokensecret a secret.
import sinon from 'sinon';
import * as usercon from '../user.controller';
import * as utilCont from '../util.controller';
import * as jwt from 'jwt-simple';

const users = [
    { name: 'Hacker', surname: 'Camp', cuid: 'userid', email: 'hacker@hack.com', password: 'pw', confirmation: 'confirmed' },
    { name: 'Pat', surname: 'Wolter', cuid: 'user2', email: 'wolter@hack.com', password: 'pw2', confirmation: 'confirmed' },
];

const scoreboards = [
    {  userCuid: users[0].cuid, scores:[{ quizCuid: 'quiz1', quizPoints: '1' },
                                        { quizCuid: 'quiz2', quizPoints: '6' }] }
];

test.beforeEach.serial('connect', t => {
  try {
    var stub = sinon.stub(utilCont, 'getKey');
    stub.returns('testiavain');
  } catch (e) {
  }
  connectDB(t, () => { });
});

test.afterEach.always.serial(async t => {
  dropDB(t, () => {
    return;
  });
});

test.serial('Adding a new scoreboard works', async t => {
    await data();

    const token = await login(1);
    const quiz = { points: 3, cuid: 'quiz3' };
    
    const res = await request(app)
      .put('/api/scores/')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({ quizzes: [quiz] });
    
    t.is(res.status, 200);
    
    const p = await Score.findOne({ userCuid: users[1].cuid }).exec();
    t.is(quiz.cuid, p.scores[0].quizCuid);
    
    await drop();
});

test.serial('Getting scoreboard works', async t => {
    await data();
    const token = await login(0);

    const res = await request(app)
     .get('/api/scores/')
     .set('authorization', token)
     .set('Accept', 'application/json');

    const p = res.body.score;
    t.is(p.scores.length, 2);
    t.is(p.userCuid, users[0].cuid);
    
    await drop();
});

test.serial('Updating a scoreboard works', async t => {
    await data();

    const token = await login(0);
    const quiz = { cuid: 'quiz1', points: 4 };
    
    const res = await request(app)
      .put('/api/scores/')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({ quizzes: [quiz] });
    
    t.is(res.status, 200);
    
    const p = await Score.findOne({ userCuid: users[0].cuid }).exec();
    
    //They're rearranged after update
    t.is(quiz.points, p.scores[1].quizPoints);
    
    await drop();
});

let login = async userIndex => {
 const user = users[userIndex];

   const confirm = await request(app)
    .get('/api/login/' + user.email + "/" + user.password + "/")
    .set('Accept', 'application/json');

  return confirm.body.token;
};

let data = async () => {
    await Promise.all(scoreboards.map(scoreboard => {
        return new Score(scoreboard).save();
    }));

    await Promise.all(users.map(user =>
        new User({...user, password: bcrypt.hashSync(user.password,  bcrypt.genSaltSync())})
      .save()));
};

let drop = async () => {
    await User.remove({}).exec();
    await Score.remove({}).exec();
};