import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * 
 */
const userSchema = new Schema({
  name: { type: 'String', required: true },
  surname: { type: 'String', required: true },
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  confirmation: { type: 'String', required: true }
});

userSchema.pre('remove', function(next){

	this.model('Score').remove({ userCuid: this.cuid }, next);

});


export default mongoose.model('User', userSchema);
