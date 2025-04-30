import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlSetUp } from './graphql/graphql.set-up';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { DataLoaderModule } from './data-loader/data-loader.module';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>(graphqlSetUp),
    DataLoaderModule,
  ],
})
export class InfrastructureModule {}
