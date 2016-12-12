import Util from '../models/util';
import User from '../models/user';
import cuid from 'cuid';

let savedUtil = null;

async function fetchUtil(){
    console.log("TEHTIIIN");
    if(!savedUtil){
        savedUtil = await Util.findOne({}).exec();
        await putUtil();
    }
}

function getEnv(name) {
    if (process.env[name]) {
        return process.env[name];
    }
    let regex = '"' + name + '=([^="]*)"';
    if (!process.env.npm_config_argv) {
        console.log("VERSION MISMATCH, UNABLE TO PARSE ENV ARGUMENTS");
        return null;
    }
    const match = process.env.npm_config_argv.match(regex);
    if (match) {
        return match[1];
    }
}

async function putUtil() {
    const newadmin = getEnv("NEWADMIN");
    const email = getEnv("EMAIL");
    const epassword = getEnv("EPASSW");
    console.log(newadmin + " " + email + " " + epassword);
    
    const doUpdate = (!savedUtil.key || newadmin || email || epassword);
    if (newadmin) {
        const user = await User.findOne({ email: newadmin }).exec();
        if (user && !(savedUtil.admins.find(admin => admin.adminCuid === user.cuid))) {
            savedUtil.admins.push({ adminCuid: user.cuid });
            console.log(savedUtil.admins);
        }
    }
    if (email) { savedUtil.emailAddress = email; }
    if (epassword) { savedUtil.emailPassword = epassword; }
    if ((epassword && email) || !savedUtil.key) { savedUtil.key = cuid(); }
    
    if (doUpdate) {
        await savedUtil.save();
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

export async function isAdminCuid(cuid) {
    await fetchUtil();
    return savedUtil.admins.find(admin => admin.adminCuid === cuid) !== undefined;
}

