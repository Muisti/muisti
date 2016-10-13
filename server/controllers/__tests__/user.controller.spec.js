import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import { connectDB, dropDB } from '../../util/test-helpers';
var proxyquire = require('proxyquire');


test.beforeEach.serial('connect and add tree users', t => {
  connectDB(t, () => {});
});

test.afterEach.always.serial(t => {
  dropDB(t, () => {
    return;
  });
});

test.serial('Adding user sends confirmation email', async t => {
   t.plan(2);

  var called = false;
  var stub = function(){
          called = true;

  };
  proxyquire('../user.controller', {'nodemailer': stub, 'mailer': stub});

  const res = await request(app)
    .post('/api/users')
    .send( { user: { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' } } )
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.truthy(called);
  
});