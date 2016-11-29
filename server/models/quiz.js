import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  cuid: { type: 'String', required: true },
  sectionCuid: { type: 'String', required: true },
  question: { type: 'String', required: true},
  options: { type: [{ text: 'String', answer: 'Boolean' }], required: true }
});



quizSchema.pre('remove', async function(next){
	await this.model('Score').update( { }, { $pull: {scores: { quizCuid: this.cuid } } }, { multi: true }, next);
});



export default mongoose.model('Quiz', quizSchema);
