// Import Actions
import { TOGGLE_ADD_POST, SHOW_ADD_POST } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
  case SHOW_ADD_POST:
     return {
        showAddPost: true,
     };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default AppReducer;
