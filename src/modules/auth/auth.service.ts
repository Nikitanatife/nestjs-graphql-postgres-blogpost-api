import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from '../user';
import { CreateUserInput, LoginInput } from './inputs';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: CreateUserInput) {
    const { email, password } = input;
    let user = await this.userService.getOne({ where: { email } });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    user = await this.userService.createUser({
      ...input,
      password: hashedPassword,
    });
    const token = await this.jwtService.signAsync({ id: user.id });

    user = await this.userService.update(user.id, { token });

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

    user = await this.userService.update(user.id, { token });

    return user;
  }

  async logout(user: User) {
    await this.userService.update(user.id, { token: null });

    return true;
  }
}
