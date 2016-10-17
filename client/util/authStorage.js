let ownStorage = false;

export function setStorage(s) {
    console.log("Asetetaan storage!!!!!!!!!!!!!!!!!!!!!! ");
    ownStorage = s;
}

export function getToken() {
    if(ownStorage){
        return ownStorage.getItem("token");
    }else{
        return "";
    }
}

export function setToken(token) {
    ownStorage.setItem("token", token);
}