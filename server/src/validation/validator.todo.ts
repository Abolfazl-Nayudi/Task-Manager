import joi from 'joi';

const TodoSchema = joi.object({
  userId: joi.string().required(),
  title: joi.string().max(20).required(),
  description: joi.string().required(),
  isCompleted: joi.boolean().default(false),
});

export { TodoSchema };
