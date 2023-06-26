import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { configService } from './config';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getDbConfig(),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      sortSchema: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        console.log(error);

        const originalError = error.extensions?.originalError as {
          [key: string]: unknown;
        };

        return {
          message: `${
            error.extensions?.status || originalError?.statusCode || 500
          } ${
            originalError?.error || 'Internal server error'
          }: ${JSON.stringify(
            originalError?.message ||
              error.extensions?.message ||
              error.message,
          )}`,
        };
      },
    }),
    UserModule,
    AuthModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
