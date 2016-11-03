import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { LoginBox } from '../../components/Header/LoginBox';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import { UserCreateModal } from '../../../User/components/UserCreateModal';
import * as authStorage from '../../../../util/authStorage';

test('renders properly', t => { 
  const wrapper = shallowWithIntl(
    <LoginBox />
  );
  
  t.is(wrapper.find('FormGroup').length, 2);
  t.is(wrapper.find('Button').length, 1);
  t.is(wrapper.find('UserCreateModal').length, 1);
});

test('renders properly when logged in', t => {
    var stub = sinon.stub(authStorage, 'getToken');
    stub.returns("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdWlkIjoiY2l1ZHBtZGo2MDAwMHRha3I0NmVnZmEyNCIsInVzZXIiOiJBbmltaSIsInRpbWUiOjE0NzY3ODUwMjA2NjZ9.Du7CVJgWA5Kju4BjEF1ENhlW5GBCs7r3vtO6oOvHJr0");
 
    const wrapper = shallowWithIntl(
     <LoginBox />
    );
   
    t.is(wrapper.find('Button').length, 1);
    t.is(wrapper.find('UserCreateModal').length, 0)
    
    stub.restore();
});

test('setToken works correctly', t =>  {
  const wrapper = shallowWithIntl(
    <LoginBox />
  );
  
  var instance = wrapper.instance();
  instance.checkToken()

  t.truthy(instance.state.validPass == "error");
});

test('setToken works correctly 2', t =>  {
  const wrapper = shallowWithIntl(
    <LoginBox />
  );

  var instance = wrapper.instance();
  instance.checkToken('emailNotValid')

  t.truthy(instance.state.validEmail == "error");
});
  
test('setToken works correctly 3', t =>  {
  const wrapper = shallowWithIntl(
    <LoginBox fetchPosts={() => {}}/>
  );
  var instance = wrapper.instance();
  var spy = sinon.spy(authStorage, 'setToken');
  
  instance.checkToken("jotainjotaintokeni")

  t.truthy(spy.calledOnce);
  });

test('logIn does not accept empty lines', t => {
    const wrapper = mountWithIntl(
      <LoginBox fetchPosts={() => {}}/>
    );
    
    var instance = wrapper.instance();
    var spy = sinon.spy(instance, "setValidationState")
    var e = {};
    e.preventDefault = sinon.stub();
    wrapper.ref('password').get(0).value = "";
    wrapper.ref('email').get(0).value = "";
    
    instance.logIn(e);
    
    
    t.truthy(spy.calledWith("email"));
});

test('logOut works as intended', t => {
  const wrapper = shallowWithIntl(
    <LoginBox fetchPosts={() => {}}/>
  );
  var instance = wrapper.instance();
  var spy = sinon.spy(authStorage, 'removeToken');
  
  instance.logOut();
  
  t.truthy(spy.calledOnce);
});

