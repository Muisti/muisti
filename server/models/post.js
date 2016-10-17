import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * 
 */
const postSchema = new Schema({
  content: { type: 'String', required: true },
  shared: { type: 'Boolean', default: true, required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  userCuid: { type: 'String', default: "eiomistajaa", required: true }
});

export default mongoose.model('Post', postSchema);
