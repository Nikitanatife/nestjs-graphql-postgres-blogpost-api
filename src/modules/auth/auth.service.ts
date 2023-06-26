import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserInput, LoginInput } from './inputs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async getHashedPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async register(input: CreateUserInput) {
    const { email, password } = input;
    let user = await this.userService.getOne({ where: { email } });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.getHashedPassword(password);

    user = await this.userService.create({
      ...input,
      password: hashedPassword,
    });
    const token = await this.jwtService.signAsync({ id: user.id });

    user = await this.userService.update(user, { token });

    return user;
  }

  async login(input: LoginInput) {
    const { email, password } = input;
    let user = await this.userService.getOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.jwtService.signAsync({ id: user.id });

    user = await this.userService.update(user, { token });

    return user;
  }

  async logout(user: User) {
    await this.userService.update(user, { token: null });

    return true;
  }

  async changePassword(user: User, password: string) {
    const hashedPassword = await this.getHashedPassword(password);

    await this.userService.update(user, { password: hashedPassword });

    return true;
  }
}
