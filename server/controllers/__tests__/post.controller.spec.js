import test from 'ava';
import request from 'supertest';
import app from '../../server';
import sinon from 'sinon';
import Post from '../../models/post';
import User from '../../models/user';
import { connectDB, dropDB } from '../../util/test-helpers';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import * as utilCont from '../util.controller';

const users = [
    { name: 'Hacker', surname: 'Camp', cuid: 'userid', email: 'hacker@hack.com', password: 'pw', confirmation: 'confirmed' },
    { name: 'Pat', surname: 'Wolter', cuid: 'user2', email: 'wolter@hack.com', password: 'pw2', confirmation: 'confirmed' },
];

// Initial posts added into test db
const posts = [
  { userCuid: users[0].cuid, cuid: 'sdfsasffsddsfds', content: "All cats meow 'mern!'", shared: false },
  { userCuid: users[1].cuid, cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'", shared: true },
];


test.beforeEach.serial('connect', t => {
  try {
    var stub = sinon.stub(utilCont, 'getKey');
    stub.returns('testiavain');
  } catch (e) {
  }
  connectDB(t, () => { });
});

let sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test.afterEach.always.serial(async t => {
  dropDB(t, () => {
    return;
  });
});

test.serial('Adding post with logged in user works', async t => {
  await data();

  const token = await login(0);
  const post = { userCuid: users[0].cuid, content: "new Poost!", shared: false };

  const res = await request(app)
    .post('/api/posts/')
    .set('authorization', token)
    .set('Accept', 'application/json')
    .send({ post });


  t.is(res.status, 200);

  const p = await Post.findOne({ content: post.content }).exec();
  t.is(p.userCuid, post.userCuid);

  await drop();
});


test.serial('Adding post without token fails', async t => {
  const post = { userCuid: users[0].cuid, cuid: 'pfofgsdfjgkf', content: "new Poost!", shared: true };

  const res = await request(app)
    .post('/api/posts/')
    .set('Accept', 'application/json')
    .send({ post });

  t.is(res.status, 403);

  const p = await Post.findOne({ cuid: post.cuid }).exec();
  t.not(p);

  await drop();
});


test.serial('Own-property is true only in users own posts', async t => {
  await data();
  const token = await login(0);

  const res = await request(app)
    .get('/api/posts/')
    .set('authorization', token)
    .set('Accept', 'application/json');

  const postit = res.body.posts;
  t.truthy(postit.filter(p => p.userCuid == users[0].cuid)[0].own);
  t.falsy(postit.filter(p => p.userCuid == users[1].cuid)[0].own);

    await drop();
});


test.serial('Unlogged user sees only shared posts', async t => {
  await data();


  const res = await request(app)
    .get('/api/posts/')
    .set('Accept', 'application/json');

  const p = res.body.posts;
  t.is(p.length, 1);
  t.is(p[0].content, posts[1].content);

    await drop();
});

test.serial('Logged in user can see own posts but cannot see others private posts', async t => {
  await data();
  const token = await login(1);

  const res = await request(app)
    .get('/api/posts/')
    .set('authorization', token)
    .set('Accept', 'application/json');

  const p = res.body.posts;
  t.is(p.length, 1);
  t.is(p[0].content, posts[1].content);
  await drop();
});


test.serial('Logged in user cannot delete others post', async t => {
  await data();
  const token = await login(0);

  const res = await request(app)
    .delete('/api/posts/' + posts[1].cuid + '/')
    .set('authorization', token)
    .set('Accept', 'application/json');

  t.is(res.status, 403);
  const p = await Post.findOne({ cuid: posts[1].cuid }).exec();
  t.is(p.content, posts[1].content);
  await drop();
});

test.serial('Logged in user can delete own post', async t => {
  await data();
  const token = await login(0);

  const res = await request(app)
    .delete('/api/posts/' + posts[0].cuid + '/')
    .set('authorization', token)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  const p = await Post.findOne({ cuid: posts[0].cuid }).exec();
  t.not(p);
  await drop();
});

test.serial('Logged in user can edit own post', async t => {
    await data();
    const token = await login(0);
    
    var post = { userCuid: users[0].cuid, cuid: posts[0].cuid, content: "All dogs meow 'mern!'", shared: posts[0].shared };
    
    const res = await request(app)
      .put('/api/posts/')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send({ post });
      
      t.is(res.status, 200);
      const p = await Post.findOne({ cuid: posts[0].cuid })
      t.is(p.content, post.content);
});


let login = async userIndex => {
 const user = users[userIndex];

   const confirm = await request(app)
    .get('/api/login/' + user.email + "/" + user.password + "/")
    .set('Accept', 'application/json');

  return confirm.body.token;
};


let data = async () => {
    await Promise.all(posts.map(post => {
        return new Post(post).save();
    }));

    await Promise.all(users.map(user =>
        new User({...user, password: bcrypt.hashSync(user.password,  bcrypt.genSaltSync())})
      .save()));
};

let drop = async () => {
    await User.remove({}).exec();
    await Post.remove({}).exec();
};
