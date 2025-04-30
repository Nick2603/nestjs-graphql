import { ConfigModuleOptions } from '@nestjs/config';
import configuration from './configuration';
import { validationOptions, validationSchema } from './validation';

export const appConfigSetUp: ConfigModuleOptions = {
  envFilePath: ['.env.development'],
  cache: true,
  expandVariables: true,
  isGlobal: false,
  load: [configuration],
  validationSchema,
  validationOptions,
};
