import callApi from '../../util/apiCaller';


export function addUserRequest(user, resultCallback) {
  callApi('users', 'post', {
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
      	password: user.password
      },
      url: (window.location.protocol + "//" + window.location.host)
    }).then(res => resultCallback(res.user));
};


 export function fetchUser(email, callback) {
    return callApi(`users/${email}`)
            .then((res) => {
                callback(res.user);
    });
}
    
 export function fetchToken(email, password, callback){
    return callApi(`login/${email}/${password}`)
            .then(res => callback(res.token));
 }


export function confirmUserAccountRequest(code, resultCallback) {
  return  callApi(`confirmation/${code}`)
          .then(res => resultCallback(res.confirmed))
          .catch(err => console.log("JOOO"));
}