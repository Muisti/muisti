import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Section from '../../components/Section';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as moduleActions from '../../ModuleActions';
import validator from 'validator';

test('renders properly', t => {
  
	const imageSection = { title: 'Section title', content: 'Sections content', link:'https://muistioppi.herokuapp.com/koe.jpg', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid' };
  const wrapper = shallowWithIntl(
    <Section section={imageSection}/>
  );

  t.is(wrapper.find('Panel').length, 1);
});

test('Renders mediafiletype correctly', t => {
	const module = { title: 'title', info: 'moduulin info', orderNumber: 1, cuid: 'cuid12' };
	const imageSection = { title: 'Section title', content: 'Sections content', link:'https://muistioppi.herokuapp.com/koe.jpg', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid' };
	const videoSection = { title: 'Section title', content: 'Sections content', link:'https://muistioppi.herokuapp.com/koe.webm', orderNumber: 1, moduleCuid: 'cuid12', cuid: 'secCuid2' };

	const wrapper = shallowWithIntl(
		<Section />
	);

	var instance = wrapper.instance();
	console.log(instance);
	const image = instance.checkMultimediaFileType(imageSection.link);
	const video = instance.checkMultimediaFileType(videoSection.link);
	const imageRender = instance.renderMultimediaFileType(image, imageSection);
	const videoRender = instance.renderMultimediaFileType(video, videoSection);

	t.is(image, "image");
	t.is(video, "video");
	t.is(imageRender.type, "img");
	t.is(videoRender.type, "video");

});