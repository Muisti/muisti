import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import { connectDB, dropDB } from '../../util/test-helpers';
import User from '../../models/user';

var proxyquire = require('proxyquire');

const users = [
  new User({ name: 'Alice', surname: 'Knox', email: 'a@aa.fi', password: 'testing12', cuid: 'f34gb2bh24b24b2' }),
  new User({ name: 'Ben', surname: 'Test', email: 'n@aa.fi', password: 'testing23', cuid: 'f34gb2bh24b24b3' }),
  new User({ name: 'Jon', surname: 'Testing', email: 'n@xa.fi', password: 'testing23', cuid: 'f34gb2bh24b24b4' }),
];

test.beforeEach.serial('connect and add tree users', t => {
  connectDB(t, () => {
    User.create(users, err => {
      if (err) t.fail('Unable to create users');
    });
  });
});

test.afterEach.always.serial(t => {
  dropDB(t, () => {
    return;
  });
});

test.serial('Creating user generates confirmation code', async t => {
  t.plan(3);

  const res = await request(app)
    .post('/api/users')
    .send( { user: { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' } } )
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  users.push(res);

  const savedUser = await User.findOne({ surname: 'One' }).exec();
  t.is(savedUser.name, 'New');
  t.deepEqual(users.length, 4);
});