import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

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

test.serial('Should correctly add a user', async t => {

  t.plan(2);

  const res = await request(app)
    .post('/api/users')
    .send( { user: { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' } } )
    .set('Accept', 'application/json');


  users.push(res);

  const savedUser = await User.findOne({ surname: 'One' }).exec();
  t.is(savedUser.name, 'New');
  t.deepEqual(users.length, 4);

});

test.serial('returns list correctly without errors ', async t => {

  const res = request(app)
    .get('/api/users/')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      t.truthy(Array.isArray(res.body), true);
      t.truthy(err, null);
      if (err) throw err;
      done();
    });
});

test.serial('Finds user correctly',  t => {

  t.plan(3);

  const user = users.find(user => user.name == 'Jon');
  const user2 = users.find(user2 => user2.email == 'a@aa.fi');
  const user3 = users.find(user3 => user3.surname == 'Test');

  t.is(user.surname, 'Testing');
  t.is(user2.name, 'Alice');
  t.is(user3.email, 'n@aa.fi');

});

test.serial('Returns undefined if user does not exist',  t => {

  t.plan(3);

  const user = users.find(user => user.name == 'Miisa');
  const user2 = users.find(user2 => user2.email == 'axa@aa.fi');
  const user3 = users.find(user3 => user3.surname == 'Te');

  t.is(user, undefined);
  t.is(user2, undefined);
  t.is(user3, undefined);

});

