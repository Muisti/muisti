/**
 * Created by susisusi on 27/09/16.
 */
import { ADD_USER, ADD_USERS } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER :
      console.log("user reduce");
      alert("reduce");
      return {
        data: [action.user, ...state.data],
      };


    case ADD_USERS :
      return {
        data: action.users,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getUsers = state => state.users.data;

// Export Reducer
export default UserReducer;
