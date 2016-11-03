import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  info: { type: 'String', required: true },
  orderNumber: { type: 'Number', required: true }
});

export default mongoose.model('Module', moduleSchema);
