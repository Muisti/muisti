import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  cuid: { type: 'String', required: true },
  moduleCuid: { type: 'String', required: true },
  title: { type: 'String', required: false },
  content: { type: 'String', required: true },
  orderNumber: { type: 'Number', required: true }
});

export default mongoose.model('Section', sectionSchema);
