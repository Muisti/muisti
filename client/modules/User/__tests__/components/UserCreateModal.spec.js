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
    <UserCreateModal editUser={false}/>
  );

  t.is(wrapper.find('span').length, 1);
  t.is(wrapper.find('FormGroup').length, 5);
  t.is(wrapper.find('Button').length, 3);

});

test('returns errors correctly', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal editUser={false}/>
  );

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
  
  t.truthy(emailError != nameError != passError);
  t.truthy(wrapper.state().error == '')
});

test('return correct colors', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal editUser={false}/>
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
