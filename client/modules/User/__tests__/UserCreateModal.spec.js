import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { UserCreateModal } from '../components/UserCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';


const props = {
  open: () => {},
  showModal: true,
};

test('sign up opens correctly', t => {

  const wrapper = shallowWithIntl(
    <UserCreateModal {...props} />
  );

  t.is(wrapper.find('Form').length, 1);
  t.is(wrapper.find('Button').length, 2);

});

//test('validations', t => {
//const submit = sinon.spy();
//const wrapper = shallowWithIntl(
//  <UserCreateModal  {...props} />
// );

// wrapper.ref('registerField').value = 'a@ae.fi';
//  wrapper.ref('formName').value = 'Jon';
// wrapper.ref('formSurname').value = 'Jonjon';
//wrapper.ref('formPassword').value = 'testing12';
//wrapper.ref('formPassVerify').value = 'testing12';


//wrapper.find('Button').simulate('click');
// t.truthy(submit.calledOnce);

//});
