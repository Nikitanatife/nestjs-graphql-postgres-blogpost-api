import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UNAUTHORIZED_ERROR } from '../../../shared/const';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
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
        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
      }

      const { id } = this.jwtService.verify(token);

      if (!id) {
        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
      }

      const user = await this.userService.getOne({ where: { id } });

      if (!user || !user.token || token !== user.token) {
        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
      }

      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
