import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config';
import { UserModule } from './modules/user';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getTypeOrmOptions(),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
