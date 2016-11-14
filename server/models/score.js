import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  userCuid: { type: 'String', required: true },
  scores: [{ quizCuid: 'String', quizPoints: 'Number' }],
});

export default mongoose.model('Score', scoreSchema);
