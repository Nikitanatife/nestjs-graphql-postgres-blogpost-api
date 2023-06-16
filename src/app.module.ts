import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getTypeOrmOptions(),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
