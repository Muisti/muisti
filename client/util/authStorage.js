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
    }else{
        return "";
    }
}

export function setToken(token) {
    ownStorage.setItem("token", token);
}