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



sectionSchema.pre('remove', function(next){

	this.model('Quiz').find({sectionCuid: this.cuid}, function(err, quizzes){
		quizzes.forEach(quiz => {
			
			quiz.remove();
		});
	
	});
	next();
});


export default mongoose.model('Section', sectionSchema);
