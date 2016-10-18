import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ModuleListItem from '../../components/ModuleListItem/ModuleListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ModuleListItem />
  );

  t.is(wrapper.find('PageHeader').length, 1);

});
