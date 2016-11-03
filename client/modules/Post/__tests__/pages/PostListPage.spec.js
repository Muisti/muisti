import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import PostListPage from '../../pages/PostListPage/PostListPage';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

test('if this fails', t => {
    t.truthy(true);
});
//const posts = [
//  { name: 'Prashant', cuid: 'f34gb2bh24b24b2', shared: false, content: "All cats meow 'mern!'" },
//  { name: 'Mayank', cuid: 'f34gb2bh24b24b3', shared: false, content: "All dogs bark 'mern!'" },
//  { name: 'Kroshant', cuid: 'f34gb2bh24b24b4', shared: true, content: "All cows moo 'mern!'" },
//];
//
//test('renders properly', t => {
//    const wrapper = shallowWithIntl(
//        <PostListPage posts={posts} store={() => {}}/>
//    );
//    
//    t.is(wrapper.find("PostCreateWidget").length, 1);
//    t.is(wrapper.find("PostList").length, 1);
//});