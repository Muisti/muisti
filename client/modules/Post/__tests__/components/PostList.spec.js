import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import PostList from '../../components/PostList';

const posts = [
  { name: 'Prashant', cuid: 'f34gb2bh24b24b2', important: false, content: "All cats meow 'mern!'" },
  { name: 'Mayank', cuid: 'f34gb2bh24b24b3', important: false, content: "All dogs bark 'mern!'" },
  { name: 'Kroshant', cuid: 'f34gb2bh24b24b4', important: true, content: "All cows moo 'mern!'" },
];

test('renders the list', t => {
  const wrapper = shallow(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={() => {}} 
        handleEditPost={() => {}} importanceColumn={false} />
  );

  t.is(wrapper.find('PostListItem').length, 2);
});

test('renders the list', t => {
  const wrapper = shallow(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={() => {}} 
        handleEditPost={() => {}} importanceColumn={true} />
  );

  t.is(wrapper.find('PostListItem').length, 1);
});