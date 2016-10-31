import test from 'ava';
import request from 'supertest';
import sinon from 'sinon';
import app from '../../server'
import { connectDB, dropDB } from '../../util/test-helpers';
import mongoose from 'mongoose';
import Module from '../../models/module';


const modules = [
  new Module ({ title: 'Ensimmäinen testimoduuli', content: 'esittelytekstiä', cuid: 'f34gb2bh24b24b2' }),
  new Module ({ title: 'Toinen testimoduuli', content: 'toisen esittelytekstiä', cuid: 'f34gb2bh24b24b3' })
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

test.serial('Should correctly give number of modules', async t => {
  await data();

  const res = await request(app)
    .get('/api/modules')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(modules.length, res.body.modules.length);

  await drop();
});

test.serial('Adds new module correctly', async t => {
  const module = {title: 'kolmas moduuli', content: 'esittelevää tekstiä'};

  const res = await request(app)
    .post('/api/modules')
    .set('Accept', 'application/json')
    .send({ module });

  t.is(res.status, 200);

  const p = await Module.findOne({ title: module.title }).exec();
  t.is(p.content, module.content);

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


