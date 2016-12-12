import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const utilSchema = new Schema({
  key: { type: 'String', required: true },
  emailAddress: { type: 'String', required: true },
  emailPassword: { type: 'String', required: true },
  emailHost: { type: 'String', required: true },
  admins: [{ adminCuid: 'String' }]
});

export default mongoose.model('Util', utilSchema);