import Util from '../models/util';

let savedUtil = null;

async function fetchUtil(){
    if(!savedUtil){
        savedUtil = await Util.findOne({}).exec();
    }
}

export async function getKey() {
    await fetchUtil();
    return savedUtil.key;
}

export async function getPassword() {
    await fetchUtil();
    return savedUtil.emailPassword;
}

export async function getEmail() {
    await fetchUtil();
    return savedUtil.emailAddress;
}

