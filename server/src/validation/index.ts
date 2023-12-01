import joi from 'joi';
import { AuthSchema } from './validator.auth';
import { TodoSchema } from './validator.todo';
import { UserSchema } from './validator.user';

const validator = (schema: joi.Schema) => {
  return (payload: object) => schema.validate(payload, { abortEarly: false });
};

const AuthValidation = validator(AuthSchema);
const TodoValidation = validator(TodoSchema);
const UserValidation = validator(UserSchema);

export { AuthValidation, TodoValidation, UserValidation };
