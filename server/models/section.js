import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  cuid: { type: 'String', required: true },
  moduleCuid: { type: 'String', required: true },
  title: { type: 'String', required: false },
  link: { type: 'String', required: false },
  content: { type: 'String', required: false },
  orderNumber: { type: 'Number', required: true }
});

sectionSchema.pre('remove', async function(next){
    await this.model('Quiz').find({sectionCuid: this.cuid}, async function(err, quizzes){
        await Promise.all(quizzes.map(quiz => {
            return quiz.remove();
        }));
    });
    next();
});

export default mongoose.model('Section', sectionSchema);
