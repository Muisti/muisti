import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ModulePage from '../../pages/ModulePage';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as moduleActions from '../../ModuleActions';


test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ModulePage />
  );

  t.is(wrapper.find('Well').length, 1);
});


test('ModulePage fetches module', t =>{
	var stub = sinon.stub(moduleActions, 'fetchModule');
	stub.returns(Promise.resolve({title: 'title', info: 'info', orderNumber: 0, cuid: 'cuidi'}));

	var stub2 = sinon.stub(moduleActions, 'fetchSections');
	stub2.returns(Promise.resolve([]));

	const wrapper = shallowWithIntl(
		<ModulePage params={{title: "koe"}} />
	);
	var instance = wrapper.instance().componentDidMount();
	
	t.truthy(stub.calledOnce);
	
	stub.restore();
	stub2.restore();
});