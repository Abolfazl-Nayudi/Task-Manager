import mongoose, { Schema } from 'mongoose';

const TodoSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    maxlength: [20, 'maximum character for title is 20'],
    required: [true, 'please enter a title'],
  },
  description: {
    type: String,
    required: [true, 'please enter a description'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export { TodoSchema };
