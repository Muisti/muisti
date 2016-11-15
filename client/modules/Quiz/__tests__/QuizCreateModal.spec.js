import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { QuizCreateModal } from '../components/QuizCreateModal';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';
import * as QuizActions from '../QuizActions';
import * as authStorage from '../../../util/authStorage';

const props = {
  sectionCuid: 'cuid12',
  addQuiz: () => {}
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

test('handleAddQuiz calls addQuizRequest and closes', t => {
    const wrapper = shallowWithIntl(
      <QuizCreateModal {...props}/>        
    );
    
    var instance = wrapper.instance();
    
    var stub = sinon.stub(QuizActions, 'addQuizRequest');
    var stub2 = sinon.stub(instance, 'clearFields')
    stub.returns( Promise.resolve(null) );
    
    instance.state.formQuestion = "kysymys";
    instance.state.fieldSize = 1;
    instance.state['1answer'] = "vastaus";
    instance.state['1chk'] = undefined;
    
    instance.handleAddQuiz();
    
    t.truthy(stub.calledOnce);
    t.truthy(stub2.calledOnce);
    stub.restore();
    stub2.restore();
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