import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { QuizPanelItem } from '../components/QuizPanelItem';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';
import * as QuizActions from '../QuizActions';

const quiz = {cuid: '3284723894', question: 'Question?', index: 0, options: [
  {text: 'False',  answer: false, checked: false},
  {text: 'True',  answer: true, checked: true},
  {text: 'False',  answer: false, checked: false}
]};

test('QuizPanelItem renders properly', t => {
  const wrapper = mountWithIntl(
    <QuizPanelItem quiz={quiz}/>
  );

  t.is(wrapper.find('div').length, 6);
  t.is(wrapper.find('span').length, 6);
  t.is(wrapper.find('Button').length, 1);
  t.is(wrapper.find('QuizItemOption').length, quiz.options.length);
  wrapper.unmount();
});
