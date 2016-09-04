import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pollOptionSchema = new Schema({
  option: String,
  votes: {
    type: Number,
    default: 0
  }
});

const pollSchema = new Schema({
  name: String,
  title: String,
  slug: String,
  cuid: String,
  dateAdded: { type: Date, default: Date.now, required: true },
  options: [pollOptionSchema]
});

export default mongoose.model('Poll', pollSchema);
