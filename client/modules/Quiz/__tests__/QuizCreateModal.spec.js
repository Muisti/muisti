import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { Section } from '../../Module/components/Section';
import { QuizCreateModal } from '../components/QuizCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';
import * as QuizActions from '../QuizActions';
import * as authStorage from '../../../util/authStorage';

const props = {
  quiz: {question: "", options: [{text: "", answer: true}]},
  save: () => {},
  cancel: () => {},
  show: true
};

test('QuizCreateModal renders properly', t => {
  const wrapper = shallowWithIntl(
    <QuizCreateModal {...props}/>
  );

  t.is(wrapper.find('Button').length, 4);
  t.is(wrapper.find('Modal').length, 1);
});

test('handleSaveQuiz does not allow empty fields', t => {
  const save = sinon.spy();
  
  const wrapper = shallowWithIntl(
    <QuizCreateModal {...props} save={save}/>
  ); 
  wrapper.instance().handleSaveQuiz();
  
  t.truthy(!save.called);
});

test('handleSaveQuiz calls save with correct data', t => {
    let savedQuiz = {};
    
    const wrapper = shallowWithIntl(
      <QuizCreateModal {...props} save={q => savedQuiz = q}/>        
    );
    
    var instance = wrapper.instance();
    
    instance.state.formQuestion = "kysymys";
    instance.state.fieldSize = 1;
    instance.state['1answer'] = "vastaus";
    instance.state['1chk'] = undefined;
    
    instance.handleSaveQuiz();
    
    t.deepEqual(savedQuiz, {
        question: "kysymys",
        options: [{ answer: false, text: "vastaus" }]
    });
});

test('removeField clears the field that was removed', t => {
    const wrapper = shallowWithIntl(
      <QuizCreateModal {...props}/>
    );
    
    var instance = wrapper.instance();
    
    instance.state.formQuestion = "kysymys";
    instance.state.fieldSize = 2;
    instance.state['1answer'] = "vastaus1";
    instance.state['1chk'] = true;
    instance.state['2answer'] = "vastaus2";
    instance.state['2chk'] = undefined;
    
    instance.removeField();
    
    t.is(instance.state.fieldSize, 1);
    t.is(instance.state['2answer'], undefined);
    
    instance.addField();
    
    t.is(instance.state.fieldSize, 2);
    t.is(instance.state['2answer'], undefined);
});

test('Clicking Add quiz in Section opens QuizCreateModal with empty quiz', t => {
  
  const section = {
      cuid: '234342423',
      content: '', title: '', link: '',
      quizzes: []
  };
  
  const wrapper = mountWithIntl(
    <Section section={section}/>
  );
  

  t.is(wrapper.find('QuizCreateModal').first().props().show, false);
  wrapper.find('Button').at(1).simulate('click');
  const modal = wrapper.find('QuizCreateModal').first();
  const passedQuiz = modal.props().quiz;
  t.is(modal.props().show, true);
  t.deepEqual(passedQuiz, {question: "", options: [{text: '', answer: false}]});
  wrapper.unmount();
});

test('Section gives editing quiz to quizcreatemodal', t => {
  const section = {
      cuid: '234342423',
      content: '', title: '', link: '',
      quizzes: [
          {cuid: '23423234', sectionCuid: '234342423',
          question: 'kysymys1', options: [
              {text: 'vaihtoehto1', answer: false},
              {text: 'vaihtoehto2', answer: true}
          ]}
      ]
  };
  
  const wrapper = mountWithIntl(
    <Section section={section}/>
  );
  
  t.is(wrapper.find('QuizCreateModal').first().props().show, false);
  wrapper.find('QuizPanel').first().props().handleEditQuiz(section.quizzes[0]);
  const modal = wrapper.find('QuizCreateModal').first();
  const passedQuiz = modal.props().quiz;
  t.is(modal.props().show, true);
  t.is(passedQuiz.cuid, section.quizzes[0].cuid);
});


test('Editing sends request with correct quiz cuid', async t => {
  const section = {
      cuid: '234342423',
      content: '', title: '', link: '',
      quizzes: [
          {cuid: '23423234', sectionCuid: '234342423',
          question: 'kysymys1', options: [
              {text: 'vaihtoehto1', answer: false},
              {text: 'vaihtoehto2', answer: true}
          ]}
      ]
  };
  let savedQuiz = null;
  const stub = sinon.stub(QuizActions, 'editQuizRequest', quiz => {
      savedQuiz = quiz;
      return Promise.resolve();
  });
  const newData = {question: "muokattu kysymys?", options: [
        {text: 'vaihtoehto3', answer: true}
  ]};
  
  const wrapper = mountWithIntl(
    <Section section={section}/>
  );
  
  wrapper.find('QuizPanel').first().props().handleEditQuiz(section.quizzes[0]);
  wrapper.find('QuizCreateModal').first().props().save(newData);
  t.is(savedQuiz.cuid, section.quizzes[0].cuid);
  t.deepEqual(savedQuiz.options, newData.options);
  await Promise.resolve();
  const quizzes = wrapper.instance().props.section.quizzes;
  t.is(quizzes.length, 1);
  t.is(quizzes[0].question, 'muokattu kysymys?');
  t.is(quizzes[0].cuid, section.quizzes[0].cuid);
  wrapper.unmount();
});

test('Editing quiz options', t => {
  
  const quiz = {cuid: '23423234', sectionCuid: '234342423',
          question: 'kysymys1', options: [
              {text: 'vaihtoehto1', answer: false},
              {text: 'vaihtoehto2', answer: true}
          ]};
  let savedQuiz = null;
  
  const wrapper = shallowWithIntl(
    <QuizCreateModal quiz={quiz} show={true} save={q => savedQuiz = q}/>
  );
  
  wrapper.find('Checkbox').at(0).simulate('change', { target: { checked: true } });
  wrapper.find('Button').at(1).simulate('click');
  wrapper.find('Button').at(2).simulate('click');
  t.deepEqual(savedQuiz.options, [{text: 'vaihtoehto1', answer: true}]);
});

