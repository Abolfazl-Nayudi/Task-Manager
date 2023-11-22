import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'please enter a username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter a password'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export { AuthSchema };
