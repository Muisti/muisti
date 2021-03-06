import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { SectionCreateModal } from '../../components/SectionCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as SectionActions from '../../SectionActions';
import * as authStorage from '../../../../util/authStorage';
import validator from 'validator'

    const props = {
        moduleCuid: 'cuid12',
        orderNumber: 1,
        addSection: () => {}
    };

test('SectionsCreateModal renders properly', t => {
    const wrapper = shallowWithIntl(
            <SectionCreateModal {...props}/>
            );

    t.is(wrapper.find('span').length, 1);
    t.is(wrapper.find('form').length, 1);
    t.is(wrapper.find('Button').length, 3);
});

test('sendSection does not add section if content empty', t => {

    const wrapper = shallowWithIntl(
            <SectionCreateModal {...props} />
            );
    var instance = wrapper.instance();

    var stub = sinon.stub(SectionActions, 'addSectionRequest');
    stub.returns(Promise.resolve({}));

    instance.setState({formContent: ""});

    instance.sendSection();

    t.truthy(!stub.called);
    stub.restore();

});


test('sendSection calls addSection', t => {
    var stub = sinon.stub(props, 'addSection');
    
    const wrapper = shallowWithIntl(
            <SectionCreateModal {...props} />
            );
    var instance = wrapper.instance();

    instance.setState({formContent: "koe!"});

    instance.sendSection();

    t.truthy(stub.calledOnce);
    stub.restore();

});

test('sendSection calls editSection', t => {
    var props2 = {
        moduleCuid: 'cuid12',
        orderNumber: 1,
        addSection: () => {},
        editSection: () => {}
    };
    var stub = sinon.stub(props2, 'editSection');
    
    const wrapper = shallowWithIntl(
            <SectionCreateModal {...props2} />
    );
    var instance = wrapper.instance();
    
    instance.setState({formContent: "content!"});
    
    instance.sendSection();
    
    t.truthy(stub.calledOnce);
    stub.restore();
});

test('if link not valid does not add section', t => {
    const wrapper = shallowWithIntl(
            <SectionCreateModal {...props} />
            );
    var instance = wrapper.instance();

    var stub = sinon.stub(SectionActions, 'addSectionRequest');
    stub.returns(Promise.resolve({}));

    wrapper.setState({formLink: "koe!"});
    wrapper.find('Button').at(1).simulate('click');

    var linkError = wrapper.state().error;
    t.truthy(linkError != "");
    t.truthy(!stub.called);
    stub.restore();
});
