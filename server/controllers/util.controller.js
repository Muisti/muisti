import User from '../models/user';
import cuid from 'cuid';

let savedKey = '';

export async function getKey() {
    if (!savedKey) {
      var util = await Util.findOne({}).exec();
      savedKey = util.key;
    }
    return savedKey;
}