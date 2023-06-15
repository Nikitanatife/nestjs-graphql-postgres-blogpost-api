import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getDatabaseOptions(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
