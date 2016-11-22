import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { QuizPanel } from '../components/QuizPanel';
import { QuizPanelItem } from '../components/QuizPanelItem';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';
import * as QuizActions from '../QuizActions';

const quizzes = [
    {cuid: '3284723894', question: 'kysymys!', index: 0, options: [
            {text: 'vastaus 2',  answer: false},
            {text: 'vastaus 2',  answer: true},
            {text: 'vastaus 2',  answer: false}
        ]}, 
    {cuid: 'dsijfdd9f8d9', question: 'Toinen kysymys?', index: 1, options: [
            {text: 'eka vastaus',  answer: true},
            {text: 'toka vastaus',  answer: false},
            {text: 'kolmas vastaus',  answer: true}
        ]}, 
];

test('QuizPanel renders properly', t => {
  const wrapper = mountWithIntl(
    <QuizPanel quizzes={quizzes}/>
  );
  
    t.is(wrapper.find('Button').length, 1);    
    t.is(wrapper.find('a').length, 1);
    t.is(wrapper.find('img').length, 1);
    t.is(wrapper.find('QuizPanelItem').length, quizzes.length);
    wrapper.unmount();
});

test('QuizPanelItem renders properly', t => {
  const wrapper = mountWithIntl(
    <QuizPanelItem quiz={quizzes[0]}/>
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
    <QuizPanel quizzes={quizzes}/>
  );
  
  var stub2 = sinon.stub(document, 'getElementById', id => {
      return {checked: (id == 'quiz0option1' || id == 'quiz1option0' || id == 'quiz1option2')};
  });
  wrapper.find('Button').first().simulate('click');
  t.truthy(stub.calledOnce);
  t.is(points[0], 1);
  t.is(points[1], 2);
  t.is(countSubStrings(wrapper.text(), 'Oikein'), 2);
  stub.restore();
  stub2.restore();  
});

test('verification with incorrect answers', t => {
  var points;
  var stub = sinon.stub(QuizActions, 'sendScoreRequest', p => points = p.map(quiz => quiz.points));
  const countSubStrings = (s, sub) => (s.match(new RegExp(sub, 'g')) || []).length;

  const stub2 = sinon.stub(document, 'getElementById', id => {
      return {checked: (id == 'quiz0option0' || id == 'quiz1option0' || id == 'quiz1option2' || id == 'quiz1option1')};
  });
  
  const wrapper = mountWithIntl(
    <QuizPanel quizzes={quizzes}/>
  );
  

  wrapper.find('Button').first().simulate('click');
  t.truthy(stub.calledOnce);
  t.is(points[0], 0);
  t.is(points[1], 1);
  t.is(countSubStrings(wrapper.text(), 'Oikein'), 0);
  stub.restore();
  stub2.restore();  
});
