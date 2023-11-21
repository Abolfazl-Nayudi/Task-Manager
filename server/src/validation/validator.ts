import joi from 'joi';

const validator = (schema: joi.Schema) => (payload: object) =>
  schema.validate(payload);

const AuthSchema = joi.object({
  username: joi.string().min(5).max(20).required(),
  password: joi.string().min(5).required(),
  token: joi.string().default(null),
});

const TodoSchema = joi.object({
  userId: joi.string().required(),
  title: joi.string().max(20).required(),
  description: joi.string().required(),
  isCompleted: joi.boolean().default(false),
});

const UserSchema = joi.object({
  userId: joi.string().required(),
  fullName: joi.string().required(),
  skills: joi.array().items(joi.string()).min(2).required(),
  age: joi.number().required(),
  githubAddress: joi.string().required(),
  linkedInAddress: joi.string().required(),
  language: joi.string().required(),
});

const AuthValidation = validator(AuthSchema);
const TodoValidation = validator(TodoSchema);
const UserValidation = validator(UserSchema);

export { AuthValidation, TodoValidation, UserValidation };
