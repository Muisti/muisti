import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { UserCreateModal } from '../../components/UserCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal />
  );

  t.is(wrapper.find('span').length, 1);
  t.is(wrapper.find('FormGroup').length, 5);
  t.is(wrapper.find('Button').length, 4);

});

test('returns errors correctly', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal />
  );

  wrapper.find('Button').at(1).simulate('click');
  var emailError = wrapper.state().error;
  wrapper.setState({ formEmail: 'sahko@posti.com' })

  wrapper.find('Button').at(1).simulate('click');
  var nameError = wrapper.state().error;
  wrapper.setState({ formName: 'Nimi' })
  wrapper.setState({ formSurname: 'Sukunimi' })

  wrapper.find('Button').at(1).simulate('click');
  var passError = wrapper.state().error;
  wrapper.setState({ formPassword: 'salasana123' });
  wrapper.setState({ formPassVerify: 'salasana123' });

  wrapper.find('Button').at(1).simulate('click');

  t.truthy(emailError != nameError != passError);
  t.truthy(wrapper.state().error == '')
});

test('return correct colors', t => {
  const wrapper = shallowWithIntl(
    <UserCreateModal />
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

