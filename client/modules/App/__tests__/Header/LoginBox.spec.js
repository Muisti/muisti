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

//function storageMock() {
//    var storage = {};
//
//    return {
//      setItem: function(key, value) {
//        storage[key] = value || '';
//      },
//      getItem: function(key) {
//        return storage[key];
//      },
//      removeItem: function(key) {
//        delete storage[key];
//      },
//      get length() {
//        return Object.keys(storage).length;
//      },
//      key: function(i) {
//        var keys = Object.keys(storage);
//        return keys[i] || null;
//      }
//    };
//}

//test('setToken works correctly', t =>  {
//  const wrapper = shallowWithIntl(
//    <LoginBox />
//  );
//  
//  console.log("1111111111111");
//  var instance = wrapper.instance();
//  global.window.sessionStorage = storageMock();
//  
//  console.log("2222222222222");
//  var spy = sinon.spy(global.window.sessionStorage, "setItem");
//  instance.forceUpdate();
//  wrapper.update();
//  
//  console.log("3333333333333");
//  
//  instance.forceUpdate();
//  wrapper.update();
//  
//  console.log("4444444444444");
//  
//  instance.setToken("token");
//  
//  console.log(spy.calledWith("token", "token"));
//  t.truthy(spy.calledWith("token", "token"));
//  
//  // Reset localStorage.setItem method    
//  spy.reset();
//});