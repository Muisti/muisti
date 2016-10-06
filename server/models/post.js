import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  content: { type: 'String', required: true },
  important: { type: 'Boolean', default: false, required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Post', postSchema);
