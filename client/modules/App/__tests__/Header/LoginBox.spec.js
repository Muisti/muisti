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