import callApi from '../../util/apiCaller';









export function addUserRequest(user) {
  
  console.log(user);
  
    callApi('users', 'post', {
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
      	password: user.password
      },
    })
  
};

 export function fetchUser(email) {
 
    return callApi(`users/${email}`);
  
}