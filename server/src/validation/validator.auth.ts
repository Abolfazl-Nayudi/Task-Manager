import joi from 'joi';

const AuthSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
  token: joi.string().default(null),
});

export { AuthSchema };
