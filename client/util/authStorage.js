var sessionStorage = '';

export function setStorage(Storage) {
    console.log("Asetetaan storage!!!!!!!!!!!!!!!!!!!!!!");
    sessionStorage = Storage;
}

export function getToken() {
    if (sessionStorage == '') {
        return '';
    }
    return sessionStorage.getItem("token");
}

export function setToken(token) {
    sessionStorage.setItem("token", token);
}