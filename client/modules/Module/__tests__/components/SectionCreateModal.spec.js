import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import SectionCreateModal from '../../components/SectionCreateModal/SectionCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as SectionActions from '../../SectionActions';


const props = {
  moduleCuid: 'cuid12',
  orderNumber: 1,
  addSectionToRender: () => {}
};

test('SectionsCreateModal renders properly', t => {
  const wrapper = shallowWithIntl(
    <SectionCreateModal {...props}/>
  );

  t.is(wrapper.find('span').length, 1);
  t.is(wrapper.find('form').length, 1);
  t.is(wrapper.find('Button').length, 3);
});

test('handleAddSections does not add section if content empty', t =>{
	const wrapper = shallowWithIntl(
    <SectionCreateModal {...props} />
  );
	var instance = wrapper.instance();

	var stub = sinon.stub(SectionActions, 'addSectionRequest');
	stub.returns(Promise.resolve({}));

	instance.setState({formContent: ""});

	instance.handleAddSection();

	t.truthy(!stub.called);
	stub.restore();

});


test('handleAddSections calls addSectionRequest', t =>{
	const wrapper = shallowWithIntl(
    <SectionCreateModal {...props} />
  );
	var instance = wrapper.instance();

	var stub = sinon.stub(SectionActions, 'addSectionRequest');
	stub.returns(Promise.resolve({}));

	instance.setState({formContent: "koe!"});

	instance.handleAddSection();

	t.truthy(stub.calledOnce);
	stub.restore();

});
