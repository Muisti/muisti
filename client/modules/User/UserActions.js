import callApi from '../../util/apiCaller';


export function addUserRequest(user) {
  return callApi('users', 'post', {
      user,
      url: (window.location.protocol + "//" + window.location.host)
    });
};

 export function fetchUser(email) {
    return callApi(`users/${email}`)
      .then(res => res.user);
}

export function fetchUserByCuid(cuid) {
    return callApi(`user/${cuid}`)
      .then(res => res.user);
}
    
 export function fetchToken(email, password, callback){
    return callApi(`login/${email}/${password}`)
            .then(res => callback(res.token));
 }

export function confirmUserAccountRequest(code, resultCallback) {
    return callApi(`confirmation/${code}`)
      .then(res => resultCallback(res.confirmed))
}