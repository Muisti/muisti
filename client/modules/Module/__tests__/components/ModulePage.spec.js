import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ModulePage from '../../pages/ModulePage';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as moduleActions from '../../ModuleActions';
import * as sectionActions from '../../SectionActions';
import validator from 'validator';

test('renders properly', t => {
    const wrapper = shallowWithIntl(
            <ModulePage />
    );

    t.is(wrapper.find('Well').length, 1);
});


test('ModulePage fetches module', t => {
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

//please change this test
test('ModulePage with no sections', t => {
    const module = {title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12'};
    const section = {title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid'};
    const section2 = {title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid2'};

    const wrapper = shallowWithIntl(
            <ModulePage />
    );

    wrapper.setState({module: {module}});
    wrapper.setState({sections: [{section}, {section2}]});

    t.is(wrapper.find('Section').length, 0);

});

test('handleAddSection calls addSectionRequest', t => {
    const module = {title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12'};
    const section = {title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid'};

    var stub = sinon.stub(sectionActions, 'addSectionRequest');
    stub.returns(Promise.resolve(section));

    const wrapper = shallowWithIntl(
            <ModulePage />
    );
    var instance = wrapper.instance();

    wrapper.setState({module: {module}});
    instance.handleAddSection(section);
    
    t.truthy(stub.calledOnce);
    stub.restore();
});

test('handleEditSection calls editSectionRequest', t => {
    const module = {title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12'};
    const section = {title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid'};

    var stub = sinon.stub(sectionActions, 'editSectionRequest');
    const wrapper = shallowWithIntl(
            <ModulePage />
    );
    var instance = wrapper.instance();
    var stub2 = sinon.stub(instance, 'addToState');

    wrapper.setState({module: {module}});
    
    instance.handleEditSection(section)(module.title,"","");
    
    t.truthy(stub2.calledOnce);
    t.truthy(stub.calledOnce);
    stub.restore();
    stub2.restore();
});

test('addToState adds new section', t => {
    const module = {title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12'};
    const section = {title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid'};

    const wrapper = shallowWithIntl(
            <ModulePage />
    );
    var instance = wrapper.instance();

    wrapper.setState({module: {module}});

    t.is(wrapper.state().sections.length, 0);
    
    instance.addToState(section);

    t.is(wrapper.state().sections.length, 1);
});

test('addToState edits a section', t => {
    const module = {title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12'};
    const section = {title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid'};

    const wrapper = shallowWithIntl(
            <ModulePage />
    );
    var instance = wrapper.instance();

    wrapper.setState({module: {module}});
    instance.addToState(section);

    t.is(wrapper.state().sections.length, 1);
    
    const title = wrapper.state().sections[0];
    
    var editedSection = {title: 'Otsikko', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid'}
    
    instance.addToState(editedSection);
    
    t.is(wrapper.state().sections.length, 1);
    
    t.is(wrapper.state().sections[0].title, editedSection.title);
});

test('Delete sections correctly', t => {
    const module = {title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12'};
    const section = {title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid'};

    var stub = sinon.stub(sectionActions, 'deleteSectionRequest');
    stub.returns(Promise.resolve(section));

    const wrapper = shallowWithIntl(
            <ModulePage />
    );

    wrapper.setState({module: {module}});

    let instance = wrapper.instance();
    instance.addToState(section);
    t.is(wrapper.state().sections.length, 1);

    instance.handleDeleteSection(section);
    t.is(wrapper.state().sections.length, 0);
    
    stub.restore();
});

