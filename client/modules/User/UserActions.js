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
            .then(res => {
                if(res.token){
                    callback(res.token)
                }else{
                    alert("Et ole vahvistanut käyttäjätiliäsi! Klikkaa linkkiä, joka löytyy sähköpostiisi lähetetystä vahvistusviestistä.");
                }
            });
            
 }


export function confirmUserAccountRequest(code, resultCallback) {
    console.log("CONFIRM PYYNTO!");
  return  callApi(`confirmation/${code}`)
          .then(res => resultCallback(res.confirmed));
}