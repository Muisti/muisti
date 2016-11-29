import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { QuizPanel } from '../components/QuizPanel';
import { QuizPanelItem } from '../components/QuizPanelItem';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';
import * as QuizActions from '../QuizActions';

const quizzes = [
    {cuid: '3284723894', question: 'kysymys!', index: 0, options: [
            {text: 'vastaus 2',  answer: false, checked: false},
            {text: 'vastaus 2',  answer: true, checked: true},
            {text: 'vastaus 2',  answer: false, checked: false}
        ]},
    {cuid: 'dsijfdd9f8d9', question: 'Toinen kysymys?', index: 1, options: [
            {text: 'eka vastaus',  answer: true, checked: true},
            {text: 'toka vastaus',  answer: false, checked: false},
            {text: 'kolmas vastaus',  answer: true, checked: true}
        ]},
];

const quizzes2 = [
    {cuid: '3284723894', question: 'kysymys!', index: 0, options: [
            {text: 'vastaus 2',  answer: false, checked: true},
            {text: 'vastaus 2',  answer: true, checked: false},
            {text: 'vastaus 2',  answer: false, checked: false}
        ]},
    {cuid: 'dsijfdd9f8d9', question: 'Toinen kysymys?', index: 1, options: [
            {text: 'eka vastaus',  answer: true, checked: true},
            {text: 'toka vastaus',  answer: false, checked: false},
            {text: 'kolmas vastaus',  answer: true, checked: false}
        ]},
];

test('QuizPanel renders properly', t => {
  const wrapper = mountWithIntl(
    <QuizPanel quizzes={quizzes} deleteQuizRender={() => {}}/>
  );

    t.is(wrapper.find('Button').length, 3);
    t.is(wrapper.find('a').length, 1);
    t.is(wrapper.find('img').length, 1);
    t.is(wrapper.find('QuizPanelItem').length, quizzes.length);
    wrapper.unmount();
});

test('QuizPanelItem renders properly', t => {
  const wrapper = mountWithIntl(
    <QuizPanelItem quiz={quizzes[0]} deleteQuizRender={() => {}}/>
  );

    t.is(wrapper.find('input').length, 3);
    t.truthy(wrapper.text().indexOf(quizzes[0].question) !== -1);
    t.truthy(wrapper.text().indexOf(quizzes[0].options[2].text) !== -1);
    wrapper.unmount();
});

test('verification with correct answers', t => {
  var points;
  var stub = sinon.stub(QuizActions, 'sendScoreRequest', p => points = p.map(quiz => quiz.points));
  const countSubStrings = (s, sub) => (s.match(new RegExp(sub, 'g')) || []).length;

  const wrapper = mountWithIntl(
    <QuizPanel quizzes={quizzes} deleteQuizRender={() => {}}/>
  );

  wrapper.find('Button').last().simulate('click');
  t.truthy(stub.calledOnce);
  t.is(points[0], 1);
  t.is(points[1], 2);
  t.is(countSubStrings(wrapper.text(), "rightAnswerFeedback"), 2);
  stub.restore();
});

test('verification with incorrect answers', t => {
  var points;
  var stub = sinon.stub(QuizActions, 'sendScoreRequest', p => points = p.map(quiz => quiz.points));
  const countSubStrings = (s, sub) => (s.match(new RegExp(sub, 'g')) || []).length;

  const wrapper = mountWithIntl(
    <QuizPanel quizzes={quizzes2} deleteQuizRender={() => {}}/>
  );

  wrapper.find('Button').last().simulate('click');
  t.truthy(stub.calledOnce);
  t.is(points[0], 0);
  t.is(points[1], 1);
  t.is(countSubStrings(wrapper.text(), 'rightAnswerFeedback'), 0);
  stub.restore();
});
