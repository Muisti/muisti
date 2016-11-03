import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import PostList from '../../components/PostList';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const posts = [
  { name: 'Prashant', cuid: 'f34gb2bh24b24b2', important: false, content: "All cats meow 'mern!'" },
  { name: 'Mayank', cuid: 'f34gb2bh24b24b3', important: false, content: "All dogs bark 'mern!'" },
  { name: 'Kroshant', cuid: 'f34gb2bh24b24b4', important: true, content: "All cows moo 'mern!'" },
];

test('renders the list', t => {
  const wrapper = shallowWithIntl(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={() => {}}
        handleEditPost={() => {}} />
  );

  t.is(wrapper.find('PostListItem').length, 3);
});

test('calls delete', t => {

  const deleteMessage = sinon.spy();
  const wrapper = mountWithIntl(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={deleteMessage}
              handleEditPost={() => {}}/>
  );

  wrapper.find('a').first().simulate('click');
  t.truthy(deleteMessage.calledOnce);

});

test('confirms delete', t => {

  const deletePostRequest = sinon.spy();
  const wrapper = mountWithIntl(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={deletePostRequest}
              handleEditPost={() => {}} />
  );
  wrapper.find('a').first().simulate('click');
  const confirmStub = sinon.stub(window, 'confirm');
  confirmStub.returns(true);

  t.truthy(confirmStub);
  t.truthy(deletePostRequest.called);

  confirmStub.restore();

});

