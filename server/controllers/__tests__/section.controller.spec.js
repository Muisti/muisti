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
  new Section({ moduleCuid: 'f34gb2bh24b24b2', content: 'Neljännen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:4, cuid: 'f67g8d6ad31b2asdsdd' }),
  new Section({ moduleCuid: 'f34gb2bh24b24b2', content: 'Kolmannen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:3, cuid: 'f67g9daafh31b2asdsdd' }),
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

test.serial('deletes a single section', async t => {
    await data();

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns(jwt.decode(token, 'secret', true));

    let section = sections[0];

    const res = await request(app)
            .delete('/api/sections/'+section.cuid)
            .send({ section })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 200);

    const p = await Section.findOne({ cuid: section.cuid }).exec();
    t.is(p, null);
    stub.restore();
    await drop();
});

test.serial('deleting a section fails without token', async t => {
    await data();

    const token = "nottoken";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns("");

    let section = sections[0];

    const res = await request(app)
            .delete('/api/sections/'+section.cuid)
            .send({ section })
            .set('Accept', 'application/json')
            .set('authorization', "");

    t.is(res.status, 403);

    const p = await Section.findOne({ cuid: section.cuid }).exec();
    t.is(p.title, section.title);
    stub.restore();
    await drop();
});

test.serial('deleting a section fails if not admin', async t => {
    await data();

    const token = "notadmin";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns("notadmin");

    let section = sections[0];

    const res = await request(app)
            .delete('/api/sections/'+section.cuid)
            .send({ section })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 403);

    const p = await Section.findOne({ cuid: section.cuid }).exec();
    t.is(p.title, section.title);
    stub.restore();
    await drop();
});


test.serial('editing section', async t => {
    await data();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns(jwt.decode(token, 'secret', true));

    const old = sections[0];
    const section = {cuid: old.cuid, orderNumber: old.orderNumber, title: 'uusi otsikko',
        content: 'uusi sisältö', link: 'uusi linkki'};

    const res = await request(app)
            .put('/api/sections')
            .send({ section })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 200);

    const s = await Section.findOne({ cuid: old.cuid }).exec();
    t.is(s.title, section.title);
    t.is(s.content, section.content);
    t.is(s.link, section.link);
    stub.restore();
    await drop();
});

test.serial('swap section order', async t => {
    await data();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns(jwt.decode(token, 'secret', true));

    const old = sections[0];
    old.orderNumber = sections[1].orderNumber;

    const res = await request(app)
            .put('/api/sections')
            .send({ section: old })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 200);

    const s = await Section.findOne({ cuid: old.cuid }).exec();
    const next = await Section.findOne({ cuid: sections[1].cuid }).exec();
    const other = await Section.findOne({ cuid: sections[4].cuid }).exec();
    t.is(s.orderNumber, 1);
    t.is(next.orderNumber, 2);
    t.is(other.orderNumber, 1);
    stub.restore();
    await drop();
});

test.serial('normal user cannot edit section', async t => {
    await data();
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns({ cuid: 'ciudpmdj60000takr46egfa24', user: 'Bnimi', time: 1478010185788 });

    const old = sections[0];
    const section = {cuid: old.cuid, orderNumber: old.orderNumber, title: 'uusi otsikko',
        content: 'uusi sisältö', link: 'uusi linkki'};

    const res = await request(app)
            .put('/api/sections')
            .send({ section })
            .set('Accept', 'application/json')
            .set('authorization', '');

    t.is(res.status, 403);

    const s = await Section.findOne({ cuid: old.cuid }).exec();
    t.is(s.title, old.title);
    t.is(s.content, old.content);
    t.is(s.link, old.link);
    stub.restore();
    await drop();
});

test.serial('trying to edit nonexisting section gives error', async t => {
    await data();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns(jwt.decode(token, 'secret', true));

    const old = sections[0];
    const section = {cuid: "jsdcinsdfu9nsfsn", orderNumber: old.orderNumber, title: 'uusi otsikko',
        content: 'uusi sisältö', link: 'uusi linkki'};

    const res = await request(app)
            .put('/api/sections')
            .send({ section })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 404);

    const s = await Section.findOne({ cuid: old.cuid }).exec();
    t.is(s.title, old.title);
    stub.restore();
    await drop();
});

test.serial('give new orderNumber', async t => {
    await data();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzgwMTAxODU3ODgsImlzQWRtaW4iOnRydWV9.xKx11SYykTbE0bcVuvTc-iiZHDGbIwvsyM2voxtVogU";
    var stub = sinon.stub(usercon, 'decodeTokenFromRequest');
    stub.returns(jwt.decode(token, 'secret', true));

    const old = sections[3];
    old.orderNumber = 100;

    const res = await request(app)
            .put('/api/sections')
            .send({ section: old })
            .set('Accept', 'application/json')
            .set('authorization', token);

    t.is(res.status, 200);

    const s = await Section.findOne({ cuid: old.cuid }).exec();
    t.is(s.orderNumber, 100);
    stub.restore();
    await drop();
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
