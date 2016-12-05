import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { UserCreateModal } from '../../components/UserCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as userActions from '../../UserActions'
import* as authStorage from '../../../../util/authStorage'


test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal editing={false}/>
  );

  t.is(wrapper.find('span').length, 1);
  t.is(wrapper.find('FormGroup').length, 5);
  t.is(wrapper.find('Button').length, 3);

});

test('returns errors correctly', t => {

  const wrapper = shallowWithIntl(
    <UserCreateModal editing={false}/>
  );

  var instance = wrapper.instance();
  var stub = sinon.stub(userActions, 'fetchUser');
  stub.returns(Promise.resolve(null));

  wrapper.find('Form').simulate('submit');
  var emailError = wrapper.state().error;
 
  wrapper.setState({ formEmail: 'sahko@posti.com' })

  wrapper.find('Form').simulate('submit');
  var nameError = wrapper.state().error;
  wrapper.setState({ formName: 'Nimi' })
  wrapper.setState({ formSurname: 'Sukunimi' })

  wrapper.find('Form').simulate('submit');
  var passError = wrapper.state().error;
  wrapper.setState({ formPassword: 'salasana123' });
  wrapper.setState({ formPassVerify: 'salasana123' });

  wrapper.find('Form').simulate('submit');
  
  t.truthy(stub.called);
  t.truthy(emailError != nameError != passError);
  t.truthy(wrapper.state().error == '');

  stub.restore();
});

test('return correct colors', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal editing={false}/>
  );

  let instance = wrapper.instance();

  instance.colorController('formEmail');
  wrapper.setState({ formEmail: 'sahko' });
  let colorEmail = wrapper.state().colorformEmail;

  instance.colorController('formPassword');
  wrapper.setState({ formPassword: 'a' });
  let colorPassword = wrapper.state().colorformPassword;

  instance.colorController('formPassVerify');
  wrapper.setState({ formPassVerify: 'ai12' });
  let colorPassVerify = wrapper.state().colorformPassVerify;

  t.is(colorEmail, 'warning');
  t.is(colorPassword, null);
  t.is(colorPassVerify, 'warning');
});

test('user can see user information', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal editing={true}/>
  );

  var stub = sinon.stub(userActions, 'fetchUserByCuid');
  stub.returns(wrapper.setState({formEmail: 'a@a.aa', formName: 'aaa' , 
                    formSurname: 'bbb', formPassword: "", formPassVerify: ""}));

  wrapper.find('Button').at(1).simulate('click');
  
  
  t.is(wrapper.find('FormControl').at(0).node.props.value, 'a@a.aa');
  t.is(wrapper.find('FormControl').at(1).node.props.value, 'aaa');
  t.is(wrapper.find('FormControl').at(2).node.props.value, 'bbb');

  stub.restore();

});


test('editUser gets called', async t => {

 const wrapper = shallowWithIntl(
    <UserCreateModal editing={true}/>
  );

  var instance = wrapper.instance();
  
  wrapper.setState({formEmail: 'a@a.aa', formName: 'aaa' , 
                    formSurname: 'bbb', formPassword: "", formPassVerify: ""});

  

  var stub = sinon.stub(instance, 'editUser');
  

  var stub2 = sinon.stub(userActions, 'fetchUser');
  
  stub2.returns(Promise.resolve(null));


  instance.handleAddUser(null);
  
  await Promise.resolve();

  t.truthy(stub2.called);
  t.truthy(stub.called);

  stub.restore();
  stub2.restore();

});