import * as jwt from 'jwt-simple';

let ownStorage = false;

export function setStorage(s) {
    ownStorage = s;
}

export function getToken() {
      if(ownStorage){
        var token = ownStorage.getItem("token");
        if (!token) {
            return "";
        }
        return ownStorage.getItem("token");
      } else {
        return "";
      }
}

export function getTokenPayload() {
    var token = getToken();
    console.log("Token: " + token);
    if (!token) {
        return null;
    }
    return jwt.decode(token, "token", true);
}

export function setToken(token) {
    if (ownStorage) {
      ownStorage.setItem("token", token);
    }
}

export function removeToken() {
    if (ownStorage) {
      ownStorage.removeItem("token");
    }
}