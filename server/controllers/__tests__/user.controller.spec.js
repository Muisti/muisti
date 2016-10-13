import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import { connectDB, dropDB } from '../../util/test-helpers';
import * as mailer from 'nodemailer';

test.beforeEach.serial('connect and add tree users', t => {
  connectDB(t, () => {});
});

test.afterEach.always.serial(t => {
  dropDB(t, () => {
    return;
  });
});

test.serial('Adding user sends confirmation email', async t => {
   t.plan(1);

  var stub = sinon.stub(mailer, 'createTransport', function(){
      console.log("JEE");
  });

  const res = await request(app)
    .post('/api/users')
    .send( { user: { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' } } )
    .set('Accept', 'application/json');

  t.is(res.status, 200);
    
  t.truthy(stub.calledOnce);
  mailer.createTransport.restore();
});