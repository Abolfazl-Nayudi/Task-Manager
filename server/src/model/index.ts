import mongoose from 'mongoose';
import { UserSchema } from './UserSchema';
import { TodoSchema } from './TodoSchema';
import { AuthSchema } from './AuthSchema';

const User = new mongoose.Model('users', UserSchema);
const Auth = new mongoose.Model('auth', AuthSchema);
const Todo = new mongoose.Model('todo', TodoSchema);

export { User, Auth, Todo };
