import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Section } from '../../components/Section';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
import * as moduleActions from '../../ModuleActions';
import validator from 'validator';

const props = {
  section: {
    cuid: 'cuid12',
    content: 'Sections content',
    title: 'Title',
    quizzes: [{sectionCuid: 'cuid12', question: 'What animal?', options: [{ text: 'Cat', answer: true }, {text: 'Snake', answer: false}]}]
  }
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <Section {...props}/>
  );

  t.is(wrapper.find('Panel').length, 1);
  t.is(wrapper.find('QuizPanel').length, 0);
});

test('Renders image-filetype correctly', t => {
  const imageSection = { content: 'Sections content', link:'http://i.imgur.com/hXvANaX.jpg' };

  const wrapper = shallowWithIntl(
    <Section section={imageSection}/>
  );

  let instance = wrapper.instance();

  const image = instance.checkMultimediaFileType(imageSection.link);
  const imageRender = instance.renderMultimediaFileType(image, imageSection);

  t.is(image, "image");
  t.is(imageRender.type, "img");
});

test('Renders video-filetype correctly', t => {
  const videoSection = { content: 'Sections content', link:'http://www.w3schools.com/html/mov_bbb.mp4' };

  const wrapper = shallowWithIntl(
    <Section section={videoSection}/>
  );

  let instance = wrapper.instance();

  const video = instance.checkMultimediaFileType(videoSection.link);
  const videoRender = instance.renderMultimediaFileType(video, videoSection);

  t.is(video, "video");
  t.is(videoRender.type, "video");
});

test('Add quizzes correctly', t => {
  const wrapper = shallowWithIntl(
    <Section {...props} />
  );

  const quiz = { sectionCuid: 'cuid142', question: 'What animal?', options: [{ text: 'Lion', answer: true }, {text: 'Cow', answer: false}] };

  let instance = wrapper.instance();
  t.is(instance.props.section.quizzes.length, 1);

  instance.addQuiz(quiz);
  t.is(instance.props.section.quizzes.length, 2);
});
