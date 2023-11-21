import joi from 'joi';

const AuthSchema = joi.object({
  username: joi.string().min(5).max(20).required(),
  password: joi.string().min(5).required(),
  token: joi.string().default(null),
});

export { AuthSchema };
