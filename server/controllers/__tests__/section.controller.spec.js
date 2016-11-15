import test from 'ava';
import request from 'supertest';
import app from '../../server'
import { connectDB, dropDB } from '../../util/test-helpers';
import mongoose from 'mongoose';
import Section from '../../models/section';
import Module from '../../models/module';

//Used to stub token, keep our own tokensecret a secret.
import sinon from 'sinon';
import * as usercon from '../user.controller';
import * as jwt from 'jwt-simple';


const modules = [
  new Module ({ title: 'Ensimmäinen testimoduuli', info: 'esittelytekstiä', orderNumber: 1, cuid: 'f34gb2bh24b24b2' }),
  new Module ({ title: 'Toinen testimoduuli', info: 'toisen esittelytekstiä', orderNumber: 2, cuid: 'f34gb2bh24b24b3' })
];

const sections = [
  new Section({ moduleCuid: 'f34gb2bh24b24b2', title: 'Title-esimerkki', content: 'Toisen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:2, cuid: 'f34gb2bh24b2asdasd' }),
  new Section({ moduleCuid: 'f34gb2bh24b24b2', content: 'Ensimmäisen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:1, cuid: 'f45gb6bh23b2asdasd' }),
  new Section({moduleCuid: 'f34gb2bh24b24b2', content: 'Neljännen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:4, cuid: 'f67g8d6ad31b2asdsdd' }),
  new Section({moduleCuid: 'f34gb2bh24b24b2',content: 'Kolmannen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:3, cuid: 'f67g9daafh31b2asdsdd' }),
  new Section({ moduleCuid: 'f34gb2bh24b24b3', title: 'Title-esimerkki', content: 'Ensimmäisen sectionin sisältöä, joka kuuluu moduuliin kaksi', orderNumber:1, cuid: 'f67gb6bh31b2asdasd' })
];

test.beforeEach.serial('connect and add', t => {
  connectDB(t, () => { });
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
  await Promise.all(sections.map(section => {
    return new Section(section).save();
  }));
};

let drop = async () => {
  await Module.remove({}).exec();
  await Section.remove({}).exec();
};

test.serial('Should correctly give number of sections and sorts them correctly', async t => {
  await data();

  const res = await request(app)
    .get('/api/sections/' + modules[0].cuid + '/')
    .set('Accept', 'application/json');

  const howManySections = await Section.find({ moduleCuid: modules[0].cuid }).exec();

  t.is(res.status, 200);
  t.deepEqual(res.body.sections.length, howManySections.length);

  for(let i = 0; i < res.body.sections.length; i++) {
    t.is(res.body.sections[i].orderNumber, i+1);
  }

  await drop();
});

test.serial('Adds new sections correctly', async t => {
  await data();

  const section = {moduleCuid: 'f34gb2bh24b24b3', title: 'Title-esimerkki', content: 'Toisen sectionin sisältöä, joka kuuluu moduuliin kaksi', orderNumber:2, cuid: 'f67g4d6bh31b2asdsdd' };
  const section2 = {moduleCuid: 'f34gb2bh24b24b3', content: 'Kolmannen sectionin sisältöä, joka kuuluu moduuliin kaksi', orderNumber:3, cuid: 'f67g4d6bh57d2asdsdg' };

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
  var stub = sinon.stub(usercon, 'decodeTokenFromRequest')
  stub.returns(jwt.decode(token, 'secret', true));

  const res = await request(app)
    .post('/api/sections')
    .set('Accept', 'application/json')
    .set('authorization', token)
    .send({ section, section2 });

  t.is(res.status, 200);

  const res2 = await request(app)
    .get('/api/sections/' + 'f34gb2bh24b24b3' + '/')
    .set('Accept', 'application/json');

  const sections = await Section.find({ moduleCuid: 'f34gb2bh24b24b3' }).exec();
  t.deepEqual(res2.body.sections.length, sections.length);

  stub.restore();
  await drop();
});

test.serial('Does not add sections with incorrect informations', async t => {
  const section = {content: 'eiMeneLapi'};

  const res = await request(app)
    .post('/api/sections')
    .set('Accept', 'application/json')
    .send({ section });

  t.is(res.status, 403);

  await drop();
});

test.serial('Adding section without content, but link provided', async t => {
  await data();

  const section = {moduleCuid: 'f34gb2bh24b24b3', title: 'Title-esimerkki', link: "linkki", orderNumber:2, cuid: 'f67g4d6bh31b2asdsdd' };

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
  var stub = sinon.stub(usercon, 'decodeTokenFromRequest')
  stub.returns(jwt.decode(token, 'secret', true));

  const res = await request(app)
    .post('/api/sections')
    .set('Accept', 'application/json')
    .set('authorization', token)
    .send({ section });

  t.is(res.status, 200);

  const res2 = await request(app)
    .get('/api/sections/' + 'f34gb2bh24b24b3' + '/')
    .set('Accept', 'application/json');

  const sections = await Section.find({ moduleCuid: 'f34gb2bh24b24b3' }).exec();
  t.deepEqual(res2.body.sections.length, sections.length);

  stub.restore();
  await drop();
});

test.serial('Cannot add section without content and link', async t => {
  await data();

  const section = {moduleCuid: 'f34gb2bh24b24b3', title: 'Title-esimerkki', orderNumber:2, cuid: 'f67g4d6bh31b2asdsdd' };

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
  var stub = sinon.stub(usercon, 'decodeTokenFromRequest')
  stub.returns(jwt.decode(token, 'secret', true));

  const res = await request(app)
    .post('/api/sections')
    .set('Accept', 'application/json')
    .set('authorization', token)
    .send({ section });

  t.is(res.status, 403);

  stub.restore();
  await drop();
});
