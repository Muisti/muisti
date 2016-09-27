/**
 * Created by susisusi on 27/09/16.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: 'String', required: true },
  lastname: { type: 'String', required: true },
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('User', userSchema);
