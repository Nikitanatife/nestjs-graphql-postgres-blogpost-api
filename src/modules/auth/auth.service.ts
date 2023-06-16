import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';
import { CreateUserInput } from './inputs';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: CreateUserInput) {
    const { email, password } = input;
    const user = await this.userService.getOne({ where: { email } });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = await this.userService.createUser({
      ...input,
      password: hashedPassword,
    });
    const token = await this.jwtService.signAsync({ id: newUser.id });

    return {
      user: newUser,
      token,
    };
  }
}
