import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { App } from '../App';
import { mountWithIntl, shallowWithIntl } from '../../../util/react-intl-test-helper';

test('mounts properly', t => { 
    const wrapper = shallowWithIntl(
      <App store={() => {}}/>
    );
    wrapper.instance().componentDidMount();
    t.truthy(wrapper.instance().state.isMounted);
});