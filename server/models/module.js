import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  info: { type: 'String', required: true },
  orderNumber: { type: 'Number', required: true }
});

moduleSchema.pre('remove', function(next){
	this.model('Section').find({moduleCuid: this.cuid}, function(err, sections) {
		sections.forEach(section => {
			section.remove();
		});

	});

	next();
});


export default mongoose.model('Module', moduleSchema);
