import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Post from '../post';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const posts = [
  new Post({ name: 'Prashant', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" }),
  new Post({ name: 'Mayank', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" }),
];

// Initial users added into test db
const users = [
  new User({ name: 'Alice', surname: 'Knox', email: 'a@aa.fi', password: 'testing12', cuid: 'f34gb2bh24b24b2' }),
  new User({ name: 'Ben', surname: 'Test', email: 'n@aa.fi', password: 'testing23', cuid: 'f34gb2bh24b24b3' }),
  new User({ name: 'Jon', surname: 'Testing', email: 'n@xa.fi', password: 'testing23', cuid: 'f34gb2bh24b24b4' }),
];

test.beforeEach.serial('connect and add posts and users', t => {
  connectDB(t, () => {
    Post.create(posts, err => {
      if (err) t.fail('Unable to create posts');
    });
    User.create(users, err => {
      if (err) t.fail('Unable to create users');
    });
  });
});

test.afterEach.always.serial(t => {
  dropDB(t);
});

// Post-model tests

test.serial('Should correctly give number of Posts', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/posts')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(posts.length, 2);
//  t.deepEqual(posts.length, res.body.posts.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const post = new Post({ name: 'Foo', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .get('/api/posts/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.post.name, post.name);
});

test.serial('Should correctly add a post', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/posts')
    .send({ post: { name: 'Foo', content: 'Hello Mern says Foo' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPost = await Post.findOne({ content: 'Hello Mern says Foo' }).exec();
  t.is(savedPost.name, 'Foo');
});

test.serial('Should correctly delete a post', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/posts')
    .send({ post: { name: 'Foo', content: 'Hello Mern says Foo' } })
    .set('Accept', 'application/json');

  const res2 = await request(app)
    .delete('/api/posts/' + res.body.post.cuid)
    .set('Accept', 'application/json');

  t.is(res2.status, 200);

  const queriedPost = await Post.findOne({ cuid: res.body.post.cuid }).exec();
  t.is(queriedPost, null);
});

// User-model tests

test.serial('Should correctly add a user', async t => {

  const res = await request(app)
    .post('/api/users')
    .send( { user: { name: 'New', surname: 'One', email: 'a@ab.fi', password: 'testing45' } } )
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  users.push(res);

  t.deepEqual(users.length, 4);

});
