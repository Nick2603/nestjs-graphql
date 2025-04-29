import Joi, { type ObjectSchema, type ValidationOptions } from 'joi';
import { NODE_ENV } from './interfaces';

export const validationSchema: ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NODE_ENV)),
  PORT: Joi.number().port(),
  DB_URL: Joi.string().uri(),
  CORS_ORIGIN: Joi.string(),
});

export const validationOptions: ValidationOptions = {
  abortEarly: true,
};
