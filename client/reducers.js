/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import posts from './modules/Post/PostReducer';
import modules from './modules/Module/ModuleReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  posts,
  intl,
  modules,
});
