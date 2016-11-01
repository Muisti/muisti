import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ModuleList from '../../components/ModuleList';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ModuleList />
  );

  t.is(wrapper.find('Accordion').length, 1);
});

