import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ModuleListItem from '../../components/ModuleListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const modules = [{ title: "11nimi", info: "11sisalto", cuid: "cuidi123123" }, { title: "22nimi", info: "22sisalto", cuid: "coidi124124" }];

test('loads properly', t => {
	

	function mockStore() {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {};
    }
  };
}  
	
  const wrapper = shallowWithIntl(
    <ModuleListItem module={modules[0]} store={mockStore()} />
  );
  
  t.truthy(wrapper.state() != undefined);
});
