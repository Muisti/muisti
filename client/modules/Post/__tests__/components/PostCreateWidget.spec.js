import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { PostCreateWidget } from '../../components/PostCreateWidget/PostCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addPost: () => {},
  showAddPost: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <PostCreateWidget {...props} />
  );

  t.is(wrapper.find('input').length, 1);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddPost is false', t => {
  const wrapper = mountWithIntl(
    <PostCreateWidget {...props} />
  );

  wrapper.setProps({ showAddPost: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <PostCreateWidget {...props} />
  );

  t.is(wrapper.prop('addPost'), props.addPost);
  t.is(wrapper.prop('showAddPost'), props.showAddPost);
});

test('calls addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.ref('content').get(0).value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.calledOnce);
  t.truthy(addPost.calledWith('Bla Bla Bla'));
});

test('empty form doesn\'t call addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addPost.called);
});

test('edit button fills correct information', t => {
    const post = { name: 'Foo', content: 'Hello Mern says Foo' };
    
    const wrapper = mountWithIntl(
            <PostCreateWidget originalPost={ post } />
    );
    
    t.truthy(wrapper.find('textarea').first().text() == 'Hello Mern says Foo');
});
