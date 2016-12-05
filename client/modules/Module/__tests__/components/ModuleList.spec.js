import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { ModuleList } from '../../components/ModuleList';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

import * as moduleActions from '../../ModuleActions';
import * as authStorage from '../../../../util/authStorage';

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ModuleList />
  );

  t.is(wrapper.find('Accordion').length, 1);
});

test('handleAddModule does addModuleRequest', t => {
  const wrapper = shallowWithIntl(
    <ModuleList />
  );
  var instance = wrapper.instance();
  var stub = sinon.stub(moduleActions, 'addModuleRequest');
  stub.returns(Promise.resolve({title: 'title', info: 'info', orderNumber: 0, cuid: 'cuidi'}))

  instance.handleAddModule("Informaatio","Otsikko");

  t.truthy(stub.calledOnce);
  stub.restore();
});

test('handleAddModule does not do addModuleRequest if field is empty', t => {
  const wrapper = shallowWithIntl(
    <ModuleList />
  );
  var instance = wrapper.instance();
  var stub = sinon.stub(moduleActions, 'addModuleRequest');
  stub.returns(Promise.resolve({title: 'title', info: 'info', orderNumber: 0, cuid: 'cuidi'}))

  instance.handleAddModule("Informaatio", "");

  t.truthy(!stub.calledOnce);
  stub.restore();
});

test('handleEditModule calls editModuleRequest', t => {
  const wrapper = shallowWithIntl(
    <ModuleList />
  );
  var instance = wrapper.instance();
  var stub = sinon.stub(moduleActions, 'editModuleRequest');
  stub.returns(Promise.resolve({}));
  const module = {title: 'title', info: 'info', orderNumber: 0, cuid: 'cuidi'};
  instance.handleEditModule(module)("new title", "new info");

  t.truthy(stub.calledOnce);
  stub.restore();
});

test('componentDidMount works', t => {
  var stub = sinon.stub(moduleActions, 'fetchModules');
  stub.returns(Promise.resolve([]));

  const wrapper = shallowWithIntl(
    <ModuleList />
  );
  wrapper.instance().componentDidMount();

  t.truthy(stub.calledOnce);
  stub.restore();
});

test('Delete module correctly', t => {
  const module = { title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12' };
  const wrapper = shallowWithIntl(
    <ModuleList />
  );

  var instance = wrapper.instance();
  var stub = sinon.stub(moduleActions, 'deleteModuleRequest');
  stub.returns(Promise.resolve({module}));

  instance.handleDeleteModule(module);

  t.truthy(stub.calledOnce);
  stub.restore();
});
