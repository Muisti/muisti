import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { QuizCreateModal } from '../components/QuizCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';
import * as QuizActions from '../QuizActions';
import * as authStorage from '../../../util/authStorage';

const props = {
  sectionCuid: 'cuid12'
};

test('SectionsCreateModal renders properly', t => {
  const wrapper = shallowWithIntl(
    <QuizCreateModal {...props}/>
  );

  t.is(wrapper.find('Button').length, 5);
  t.is(wrapper.find('Modal').length, 1);
});

test('handleAddQuiz does not allow empty fields', t => {
  var stub = sinon.stub(QuizActions, 'addQuizRequest');
    
  const wrapper = shallowWithIntl(
    <QuizCreateModal {...props}/>
  ); 
  
  var instance = wrapper.instance();
  
  instance.handleAddQuiz();
  
  t.truthy(!stub.called);
  
  stub.restore();
});
