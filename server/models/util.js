import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const utilSchema = new Schema({
  key: { type: 'String', required: false },
  emailAddress: { type: 'String', required: false },
  emailPassword: { type: 'String', required: false },
  emailHost: { type: 'String', required: false },
  admins: [{ adminCuid: 'String' }]
});

export default mongoose.model('Util', utilSchema);