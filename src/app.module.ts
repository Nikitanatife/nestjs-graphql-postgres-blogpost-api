import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { configService } from './config';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getTypeOrmOptions(),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      sortSchema: true,
      playground: true,
      formatError: (error: GraphQLError) => ({
        message: `${error.extensions['status'] || 500} ${
          error.extensions?.originalError['error'] || 'Internal server error'
        }: ${error.extensions?.message || error.message}`,
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
