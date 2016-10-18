import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { LoginBox } from '../../components/Header/LoginBox';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

test('renders properly', t => { 
  const wrapper = shallowWithIntl(
    <LoginBox />
  );
  
  t.is(wrapper.find('FormGroup').length, 2);
  t.is(wrapper.find('Button').length, 1);
});

//test('logIn gets called', t => {
//	
//	const wrapper = shallowWithIntl(
//	<LoginBox/>
//	);
//
//	var wrap = wrapper.instance();
//	var stub = sinon.stub(wrap, 'logIn', function(){console.warn("koe!");});
//	wrap.forceUpdate();
//	wrapper.update();
//	wrapper.find('Button').first().simulate('click');
//
//	t.truthy(stub.called);
//
//});

//
//test('LogIn sets validation states correctly', t => {
//	const wrapper = shallowWithIntl(
//	<LoginBox/>
//	);
//
//	var wrap = wrapper.instance();
//	var spy = sinon.spy(wrap, 'setToken');
//	wrap.forceUpdate();
//	wrapper.update();
//
//
//	wrap.setToken();
//	console.warn(wrap);
//	t.is(wrap.state.validEmail, "error");
//
//	spy.restore();
//});

test('setToken works correctly', t =>  {
  const wrapper = shallowWithIntl(
    <LoginBox />
  );
  
  var instance = wrapper.instance();
  instance.checkToken()

  t.truthy(instance.state.validPass == "error");

//  console.log(spy.calledWith("token", "token"));
//  t.truthy(spy.calledWith("token", "token"));
//  
  // Reset localStorage.setItem method    
//  spy.reset();
});

test('setToken works correctly 2', t =>  {
  const wrapper = shallowWithIntl(
    <LoginBox />
  );

  var instance = wrapper.instance();
  instance.checkToken('emailNotValid')

  t.truthy(instance.state.validEmail == "error");
});
  
//test.only('setToken works correctly 3', t =>  {
//  const wrapper = mountWithIntl(
//    <LoginBox fetchPosts={() => {}}/>
//  );
//  
//  console.log("1111111111111");
//  var instance = wrapper.instance();
////  Miten ketussa vakoillaan componentin ulkopuolista funktiota
//  var spy = sinon.spy(setToken);
//  
//  instance.checkToken("jotainjotaintokeni")
//  
//  console.log("2222222222222");
//
//  t.truthy(spy.called);
//  
//  console.log("333333333333");
//  });

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