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

  t.truthy(wrapper.find('div'));
  t.truthy(wrapper.find('Form'));
  t.truthy(wrapper.find('Modal.Title'));


});
