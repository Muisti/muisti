/**
 * Created by susisusi on 27/09/16.
 */
import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const ADD_USERS = 'ADD_USERS';


// Export Actions

export function addUser(user) {
  console.log("user actionissa");
  alert("acti");
  return {
    type: ADD_USER,
    user,
  };
}



export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users', 'post', {
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      },
    }).then(res => dispatch(addUser(res.user)));
  };
}

export function addUsers(users) {
  return {
    type: ADD_USERS,
    users,
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return callApi('users').then(res => {
      dispatch(addUsers(res.users));
    });
  };
}

export function fetchUser(cuid) {
  return (dispatch) => {
    return callApi(`users/${cuid}`).then(res => dispatch(adduser(res.user)));
  };
}

