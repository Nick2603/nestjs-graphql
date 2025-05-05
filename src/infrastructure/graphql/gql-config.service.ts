import { join } from 'node:path';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLContext } from './interfaces';
import { ROUTES } from 'src/common/routes/routes';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      path: ROUTES.GRAPHQL,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }: GraphQLContext): GraphQLContext => ({
        req,
        res,
      }),
    };
  }
}
