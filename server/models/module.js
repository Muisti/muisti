import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  info: { type: 'String', required: true },
  orderNumber: { type: 'Number', required: true }
});

moduleSchema.pre('remove', async function(next){
	
	await this.model('Section').find({moduleCuid: this.cuid}, async function(err, sections) {
		await Promise.all(sections.map(section => {
			return section.remove();
		}));
	});
		
	next();
});


export default mongoose.model('Module', moduleSchema);
