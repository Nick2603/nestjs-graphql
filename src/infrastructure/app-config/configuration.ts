import { registerAs } from '@nestjs/config';
import { NODE_ENV } from './interfaces';

export default registerAs('configuration', () => ({
  port: parseInt(process.env.PORT as string, 10),
  nodeEnv: process.env.NODE_ENV as NODE_ENV,
  databaseUrl: process.env.DB_URL as string,
  corsOrigin: process.env.CORS_ORIGIN as string,
  jwtSecret: process.env.JWT_SECRET as string,
  redisUrl: process.env.REDIS_URL as string,
  esUrl: process.env.ES_URL as string,
}));
