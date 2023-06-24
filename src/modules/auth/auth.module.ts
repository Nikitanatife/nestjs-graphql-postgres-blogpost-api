import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from '../../config';
import { UserModule } from '../user';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: configService.getJwtSecret(),
      signOptions: { expiresIn: configService.getJwtExpiresIn() },
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
