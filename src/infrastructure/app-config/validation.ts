import * as Joi from 'joi';
import { NODE_ENV } from './interfaces';

export const validationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid(...Object.values(NODE_ENV)),
  PORT: Joi.number().port(),
  DB_URL: Joi.string().uri(),
  CORS_ORIGIN: Joi.string(),
  JWT_SECRET: Joi.string(),
});

export const validationOptions: Joi.ValidationOptions = {
  abortEarly: true,
};
