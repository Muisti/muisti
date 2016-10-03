import callApi from '../../util/apiCaller';







export function addUserRequest(user) {
  
  
  callApi('users', 'post', {
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
      	password: user.password
      },
    })
  
};

 export function fetchUser(email, callback) {
    
    return callApi(`users/${email}`)
            .then((res) => {
                callback(res.user);
    });
    //.then(res => console.log(res.user));
  
}
    