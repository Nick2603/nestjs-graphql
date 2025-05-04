import { ApolloDriver } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';

export const graphqlSetUp: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  useClass: GqlConfigService,
};
