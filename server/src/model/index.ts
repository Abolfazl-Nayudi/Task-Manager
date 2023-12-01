import mongoose from 'mongoose';
import { UserSchema } from './UserSchema';
import { TodoSchema } from './TodoSchema';
import { AuthSchema } from './AuthSchema';

const User = mongoose.model('users', UserSchema);
const Auth = mongoose.model('auth', AuthSchema);
const Todo = mongoose.model('todo', TodoSchema);

export { User, Auth, Todo };
