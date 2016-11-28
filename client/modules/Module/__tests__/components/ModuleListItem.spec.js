import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ModuleListItem from '../../components/ModuleListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const modules = [{ title: "11nimi", info: "11sisalto" }, { title: "22nimi", info: "22sisalto" }];

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ModuleListItem module={modules[0]} />
  );

  t.is(wrapper.find('div').length, 1);
});
