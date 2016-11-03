import test from 'ava';
import request from 'supertest';
import app from '../../server'
import { connectDB, dropDB } from '../../util/test-helpers';
import mongoose from 'mongoose';
import Module from '../../models/module';


//Used to stub token, keep our own tokensecret a secret.
import sinon from 'sinon';
import * as usercon from '../user.controller';
import * as jwt from 'jwt-simple';


const modules = [
  new Module ({ title: 'Kolmas testimoduuli', info: 'esittelytekstiä', orderNumber: 3, cuid: 'f34gb2bh24b24b2' }),
  new Module ({ title: 'Ensimmäinen testimoduuli', info: 'toisen esittelytekstiä', orderNumber: 1, cuid: 'f34gb2bh24b24b3' }),
  new Module ({ title: 'Neljäs testimoduuli', info: 'toisen esittelytekstiä', orderNumber: 4, cuid: 'f34gb2bh24b24b4' }),
  new Module ({ title: 'Toinen testimoduuli', info: 'toisen esittelytekstiä', orderNumber: 2, cuid: 'f34gb2bh24b24b5' })
];

test.beforeEach.serial('connect and add', t => {
  connectDB(t, () => {
    Module.create(modules, err => {
      if (err) t.fail('Unable to create users');
    });
  });
});

test.afterEach.always.serial(t => {
  dropDB(t, () => {
    return;
  });
});

let data = async () => {
  await Promise.all(modules.map(module => {
    return new Module(module).save();
  }));
};

let drop = async () => {
  await Module.remove({}).exec();
};

test.serial('Should correctly give number of modules and sorts them correctly', async t => {
  await data();

  const res = await request(app)
    .get('/api/modules')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(modules.length, res.body.modules.length);

  for(let i = 0; i < res.body.modules.length; i++) {
    t.deepEqual(res.body.modules[i].orderNumber, i+1);
  }

  await drop();
});

test.only.serial('Adds new module correctly', async t => {
  
  const module = {title: 'viides moduuli', info: 'esittelevää tekstiä', orderNumber: 5};
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
  var stub = sinon.stub(usercon, 'decodeTokenFromRequest')
  stub.returns(jwt.decode(token, 'secret', true));
  
  const res = await request(app)
    .post('/api/modules')
    .set('Accept', 'application/json')
    .set('authorization', token)
    .send({ module });

  t.is(res.status, 200);

  const p = await Module.findOne({ title: module.title }).exec();
  t.is(p.info, module.info);

  stub.restore();
  await drop();
});

test.serial('Finds module correctly', async t => {
  await data();

  const encodeTitle = encodeURI(modules[0].title);

  const res = await request(app)
    .get('/api/modules/' + encodeTitle + '/')
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  await drop();
});

test.serial('Does not add modules with incorrect informations', async t => {
  const module = {title: 'eiMene'};

  const res = await request(app)
    .post('/api/modules')
    .set('Accept', 'application/json')
    .send({ module });

  t.is(res.status, 403);

  await drop();
});