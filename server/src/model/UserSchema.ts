import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
  fullName: {
    type: String,
    required: [true, 'please enter your full name'],
  },
  skills: {
    type: Array,
    required: [true, 'please enter your skills'],
  },
  age: {
    type: Number,
    required: [true, 'please enter your age'],
  },
  githubAddress: {
    type: String,
    default: null,
  },
  linkedInAddress: {
    type: String,
    default: null,
  },
  language: {
    type: String,
    required: [true, 'please enter your language'],
  },
});

export { UserSchema };
