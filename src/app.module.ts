import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { configService } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { BlogPostModule } from './modules/blog-post/blog-post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getDbConfig()),
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
    BlogPostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
