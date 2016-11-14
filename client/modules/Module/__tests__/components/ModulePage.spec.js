import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ModulePage from '../../pages/ModulePage';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as moduleActions from '../../ModuleActions';
import validator from 'validator';

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

test('ModulePage with no sections', t => {
  const module = { title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12' };
  const section = { title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid' };
  const section2 = { title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid2' };

  const wrapper = shallowWithIntl(
    <ModulePage />
  );

  wrapper.setState({ module: {module} });
  wrapper.setState({ sections: [{section}, {section2}]});

  t.is(wrapper.find('Panel').length, 2);

});

test('Adds new sections', t => {
  const module = { title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12' };
  const section = { title: 'Section title', content: 'Sections content', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid' };

  const wrapper = shallowWithIntl(
    <ModulePage />
  );

  wrapper.setState({ module: {module} });

  t.is(wrapper.state().sections.length, 0);

  var instance = wrapper.instance();
  instance.addSectionToRender(section);

  t.is(wrapper.state().sections.length, 1);
});


test('Renders mediafiletype correctly', t => {
  const module = { title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12' };
  const imageSection = { title: 'Section title', content: 'Sections content', link:'https://muistioppi.herokuapp.com/koe.jpg', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid' };
  const videoSection = { title: 'Section title', content: 'Sections content', link:'https://muistioppi.herokuapp.com/koe.webm', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid2' };

  const wrapper = shallowWithIntl(
      <ModulePage />
    );


  
 
  var instance = wrapper.instance();
  const image = instance.checkMultimediaFileType(imageSection.link);
  const video = instance.checkMultimediaFileType(videoSection.link);
  const imageRender = instance.renderMultimediaFileType(image, imageSection);
  const videoRender = instance.renderMultimediaFileType(video, videoSection);
  
  t.is(image, "image");
  t.is(video, "video");
  t.is(imageRender.type, "img");
  t.is(videoRender.type, "video");

});