import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const utilSchema = new Schema({
  key: { type: 'String', required: true },
});

export default mongoose.model('Util', utilSchema);