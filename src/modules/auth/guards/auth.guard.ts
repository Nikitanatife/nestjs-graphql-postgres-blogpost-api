import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let autHeader = '';

    if (req.headers && req.headers.authorization) {
      autHeader = req.headers.authorization;
    }

    const [bearer, token] = autHeader.split(' ');

    try {
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Unauthorized');
      }

      const { userId } = this.jwtService.verify(token);
      const user = await this.userService.getOne({ where: { id: userId } });

      if (!user || !user.token || token !== user.token) {
        throw new UnauthorizedException('Unauthorized');
      }

      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
