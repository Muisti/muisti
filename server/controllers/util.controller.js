import Util from '../models/util';

let savedKey = '';

export async function getKey() {
    if (!savedKey) {
      var util = await Util.findOne({}).exec();
      savedKey = util.key;
    }
    return savedKey;
}