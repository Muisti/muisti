import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true }
});

export default mongoose.model('Module', moduleSchema);
