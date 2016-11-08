import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import { connectDB, dropDB } from '../../util/test-helpers';
import User from '../../models/user';
import * as bcrypt from 'bcryptjs';
import * as utilCont from '../util.controller';


const confirmedUser = [
  new User({ name: 'Alice', surname: 'Knox', email: 'a@aa.fi', password: 'testing12', cuid: 'f34gb2bh24b24b2', confirmation: "confirmed" })
];

test.beforeEach.serial('connect and add tree users', t => {
  try {
    var keyStub = sinon.stub(utilCont, 'getKey');
    var passStub = sinon.stub(utilCont, 'getPassword');
    var emailStub = sinon.stub(utilCont, 'getEmail');
    keyStub.returns('testiavain');
    emailStub.returns('sahkoposti@gmail.com');
    passStub.returns("salis");
  } catch (e) {}
  connectDB(t, () => {
    User.create(confirmedUser, err => {
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
  t.plan(1);

  const res = await request(app)
    .post('/api/users')
    .send( { user: { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' } } )
    .set('Accept', 'application/json');

  const savedUser = await User.findOne({ surname: 'One' }).exec(); 
  t.truthy(savedUser.confirmation.length > 20);
});


test.serial('Cannot login without confirmation', async t => {
 const user = { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' };

  const res = await request(app)
    .post('/api/users')
    .send( { user: {...user, password: bcrypt.hashSync(user.password,  bcrypt.genSaltSync())} } )
    .set('Accept', 'application/json');
    
   const confirm = await request(app)
    .get('/api/login/' + user.email + "/" + user.password + "/")
    .set('Accept', 'application/json');
    
  t.is(confirm.body.token, "notConfirmed");
});


test.serial('Login with confirmed user', async t => {
 const user = { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' };

  const res = await request(app)
    .post('/api/users')
    .send( { user: {...user, password: bcrypt.hashSync(user.password,  bcrypt.genSaltSync())} } )
    .set('Accept', 'application/json');
    
  const savedUser = await User.findOne({ name: 'New' }).exec();
  savedUser.confirmation = "confirmed";
    
  await savedUser.save();
    
   const confirm = await request(app)
    .get('/api/login/' + user.email + "/" + user.password + "/")
    .set('Accept', 'application/json');
    
  t.truthy(confirm.body.token.startsWith("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9."));
});


test.serial('Confirmation with generated code', async t => {
 const user = { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' };

  const res = await request(app)
    .post('/api/users')
    .send( { user: {...user, password: bcrypt.hashSync(user.password,  bcrypt.genSaltSync())} } )
    .set('Accept', 'application/json');
    
  const u = await User.findOne({ name: 'New' }).exec();
  const code = u.confirmation;
  
    
  const confirm = await request(app) 
    .get('/api/confirmation/' + code + "/")
    .set('Accept', 'application/json');
    
  t.is(confirm.status, 200);
  t.truthy(confirm.body.confirmed);
    
  const savedUser = await User.findOne({ name: 'New' }).exec();
  
  t.is(savedUser.confirmation, "confirmed");
});
