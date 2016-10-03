import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

const users = [
  new User({ name: 'Alice', surname: 'Knox', email: 'a@aa.fi', password: 'testing12', cuid: 'f34gb2bh24b24b2' }),
  new User({ name: 'Ben', surname: 'Test', email: 'n@aa.fi', password: 'testing23', cuid: 'f34gb2bh24b24b2' }),
  new User({ name: 'Jon', surname: 'Testing', email: 'n@xa.fi', password: 'testing23', cuid: 'f34gb2bh24b24b2' }),
];

test.beforeEach.serial('connect and add tree users', t => {
  connectDB(t, () => {
    User.create(users, err => {
      if (err) t.fail('Unable to create users');
    });
  });
});

test.afterEach.always.serial(t => {
  dropDB(t);
});


test.serial('Should correctly add a user', async t => {

  const res = await request(app)
    .post('/api/users')
    .send( { user: { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' } } )
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  users.push(res);

  t.deepEqual(users.length, 4);

});
