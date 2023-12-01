import joi from 'joi';

const AuthSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().min(5).trim().required(),
  token: joi.string().default(null),
});

export { AuthSchema };
