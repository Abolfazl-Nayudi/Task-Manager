import joi from 'joi';

const UserSchema = joi.object({
  userId: joi.string().required(),
  fullName: joi.string().required(),
  skills: joi.array().items(joi.string()).min(2).required(),
  age: joi.number().required(),
  githubAddress: joi.string().required(),
  linkedInAddress: joi.string().required(),
  language: joi.string().required(),
});

export { UserSchema };
