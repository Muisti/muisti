import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const users = [
  new User({ name: 'Alice', surname: 'Knox', email: 'a@aa.fi', password: 'testing12', cuid: 'f34gb2bh24b24b2' }),
  new User({ name: 'Ben', surname: 'Test', email: 'n@aa.fi', password: 'testing23', cuid: 'f34gb2bh24b24b2' }),
  new User({ name: 'Jon', surname: 'Testing', email: 'x@xx.fi', password: 'testing34', cuid: 'f34gb2bh24b24b2' }),
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
  t.plan(2);

  const res = await request(app)
    .post('/api/users')
    .send( { name: '', surname: '', email: '', password: '' } )
    .set('Accept', 'application/json');

  t.is(res.status, 200);

});


