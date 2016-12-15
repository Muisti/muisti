import { enabledLanguages, localizationData } from '../../../Intl/setup';
import { SWITCH_LANGUAGE } from './IntlActions';

const initLocale = global.navigator && global.navigator.language || 'fi';

const initialState = {
  locale: initLocale,
  enabledLanguages,
  ...(localizationData[initLocale] || {}),
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE: {
      const { type, ...actionWithoutType } = action; // eslint-disable-line
      return { ...state, ...actionWithoutType };
    }
    default:
      return state;
  }
};

export const getIntl = state => state.intl; 

export default IntlReducer;
