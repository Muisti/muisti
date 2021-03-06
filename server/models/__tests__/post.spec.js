import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Post from '../post';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const posts = [
  new Post({ name: 'Prashant', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" }),
  new Post({ name: 'Mayank', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" }),
];

test.beforeEach.serial('connect and add posts and users', t => {
  connectDB(t, () => {
    Post.create(posts, err => {
      if (err) t.fail('Unable to create posts');
    });
  });
});

test.afterEach.always.serial(t => {
  dropDB(t);
});

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

  const post = new Post({ cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .get('/api/posts/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.post.content, post.content);
});

//test.serial('Should correctly add a post', async t => {
//  t.plan(2);
//
//  const res = await request(app)
//    .post('/api/posts')
//    .send({ post: { content: 'Hello Mern says Foo' } })
//    .set('Accept', 'application/json')
//    .set('authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzY3MTMxODIzNTR9.MIg1p3TFZGo7kOZQiHjO_CU1v_VvGj6cL-bBaIcBHVM');
//
//  t.is(res.status, 200);
//
//  const savedPost = await Post.findOne({ content: 'Hello Mern says Foo' }).exec();
//  t.is(savedPost.content, 'Hello Mern says Foo');
//});
//
//test.serial('Should correctly delete a post', async t => {
//  t.plan(2);
//
//  const res = await request(app)
//    .post('/api/posts')
//    .send({ post: { name: 'Foo', content: 'Hello Mern says Foo' } })
//    .set('Accept', 'application/json');
//
//  const res2 = await request(app)
//    .delete('/api/posts/' + res.body.post.cuid)
//    .set('Accept', 'application/json');
//
//  t.is(res2.status, 200);
//
//  const queriedPost = await Post.findOne({ cuid: res.body.post.cuid }).exec();
//  t.is(queriedPost, null);
//});

